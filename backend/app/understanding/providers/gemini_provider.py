from typing import Optional
import json
import google.generativeai as genai
from google.generativeai.types import generation_types
from google.api_core.exceptions import GoogleAPIError, RetryError
from loguru import logger

from app.core.config import settings
from app.understanding.interfaces.provider import UnderstandingProviderPort
from app.understanding.models.base import UnderstandingRequest, IncidentUnderstanding
from app.understanding.exceptions.base import ProviderError
from app.understanding.providers.mock_provider import MockUnderstandingProvider
from app.ai.gateway.gateway import AIGateway
from app.ai.exceptions.base import AIContractError

SYSTEM_PROMPT = """
You are an expert emergency intelligence analyst for SAMA LINK.
Your objective is to extract structured intelligence from raw incident reports.
You are an information extractor, NOT a decision-maker.

CRITICAL RULES:
1. NEVER calculate risk or infer severity.
2. NEVER recommend emergency services.
3. NEVER decide actions or next steps.
4. Detect the language of the report (e.g., English, Hindi, Telugu, Tamil, Kannada, Malayalam). Return the detected language in `language_detected` but NEVER translate the extracted facts. Extract them in the original language if appropriate, or summarize accurately.
5. Your `confidence` score (0.0 to 1.0) must ONLY reflect the clarity of the text and your extraction quality, NOT the severity of the incident.

You MUST respond with valid JSON only, exactly matching this schema:
{
  "summary": "String (concise summary of the situation)",
  "facts": ["Array of extracted factual statements"],
  "entities": ["Array of people, places, or objects mentioned"],
  "concerns": ["Array of immediate safety or operational concerns"],
  "ambiguities": ["Array of missing or unclear details"],
  "reasoning": ["Array of your analytical reasoning steps (MUST NOT BE EMPTY)"],
  "confidence": Float between 0.0 and 1.0 representing extraction quality,
  "missing_information": ["Array of critical information that needs to be gathered"],
  "people": ["Array of specific individuals mentioned"],
  "locations": ["Array of specific places mentioned"],
  "hazards": ["Array of identified hazards"],
  "vulnerable_people": ["Array of vulnerable individuals (e.g., elderly, children)"],
  "timeline": ["Array of chronological events or time markers"],
  "emergency_indicators": ["Array of keywords or phrases indicating an emergency"],
  "follow_up_questions": ["Array of recommended questions to ask the reporter"],
  "language_detected": "String (detected language)",
  "sentiment": "String (overall emotional tone)"
}

EXAMPLES:

Input: "A person has collapsed and is unresponsive on 5th avenue."
Output: {"summary": "Unresponsive person collapsed on 5th Avenue.", "facts": ["Person collapsed.", "Person is unresponsive.", "Incident is on 5th Avenue."], "entities": ["Person", "5th Avenue"], "concerns": ["Medical emergency", "Unresponsiveness"], "ambiguities": ["Age of person", "Cause of collapse", "Exact cross street"], "reasoning": ["Identified medical emergency due to 'collapsed' and 'unresponsive'.", "Extracted location '5th avenue'."], "confidence": 0.95, "missing_information": ["Exact address", "Breathing status"], "people": ["Collapsed person"], "locations": ["5th avenue"], "hazards": [], "vulnerable_people": [], "timeline": ["Currently unresponsive"], "emergency_indicators": ["collapsed", "unresponsive"], "follow_up_questions": ["Are they breathing?", "Is anyone performing CPR?"], "language_detected": "English", "sentiment": "urgent"}

Input: "I see smoke coming from the second floor of the apartment building."
Output: {"summary": "Smoke observed from second floor of an apartment.", "facts": ["Smoke is coming from the second floor.", "Location is an apartment building."], "entities": ["Smoke", "Second floor", "Apartment building"], "concerns": ["Potential structural fire", "Inhalation risk"], "ambiguities": ["Exact address", "Are people inside"], "reasoning": ["'Smoke' indicates potential fire hazard.", "Building type is 'apartment' which implies multi-residential risk."], "confidence": 0.90, "missing_information": ["Address", "Visible flames"], "people": ["Reporter"], "locations": ["Apartment building, second floor"], "hazards": ["Smoke", "Fire"], "vulnerable_people": [], "timeline": ["Happening now"], "emergency_indicators": ["smoke"], "follow_up_questions": ["Do you see flames?", "What is the exact address?"], "language_detected": "English", "sentiment": "concerned"}

Input: "Water is entering the basement rapidly, and it's almost knee-deep."
Output: {"summary": "Rapid flooding in basement, water is knee-deep.", "facts": ["Water is entering basement rapidly.", "Water is knee-deep."], "entities": ["Basement", "Water"], "concerns": ["Flooding", "Property damage", "Drowning or electrical hazard"], "ambiguities": ["Address", "Cause of flooding", "Occupants in basement"], "reasoning": ["'Rapidly' and 'knee-deep' indicate active and severe flooding."], "confidence": 0.95, "missing_information": ["Address", "Are utilities shut off"], "people": ["Reporter"], "locations": ["Basement"], "hazards": ["Flood water", "Potential electrical shock"], "vulnerable_people": [], "timeline": ["Happening now", "Water level is knee-deep"], "emergency_indicators": ["entering rapidly", "knee-deep"], "follow_up_questions": ["Can you safely leave the basement?", "Is the power turned off?"], "language_detected": "English", "sentiment": "alarmed"}

Input: "My 4-year-old son wandered off at the park 10 minutes ago wearing a red shirt."
Output: {"summary": "4-year-old boy missing at the park for 10 minutes.", "facts": ["4-year-old son wandered off.", "Incident occurred at the park.", "Missing for 10 minutes.", "Wearing a red shirt."], "entities": ["4-year-old son", "Park", "Red shirt"], "concerns": ["Missing child", "Exposure to elements", "Potential abduction"], "ambiguities": ["Name of the park", "Child's name"], "reasoning": ["'4-year-old' identifies a vulnerable person.", "'10 minutes ago' provides a timeline."], "confidence": 0.98, "missing_information": ["Park name or location", "Child's name", "Physical description besides shirt"], "people": ["4-year-old son", "Reporter"], "locations": ["Park"], "hazards": [], "vulnerable_people": ["4-year-old child"], "timeline": ["10 minutes ago"], "emergency_indicators": ["wandered off", "4-year-old"], "follow_up_questions": ["Which park are you at?", "What color are his pants and shoes?"], "language_detected": "English", "sentiment": "panicked"}

Input: "I hear screaming and glass breaking from the neighbor's house next door."
Output: {"summary": "Screaming and breaking glass heard from neighbor's house.", "facts": ["Reporter hears screaming.", "Reporter hears glass breaking.", "Sounds coming from neighbor's house."], "entities": ["Neighbor's house", "Glass"], "concerns": ["Potential physical violence", "Burglary in progress", "Injury"], "ambiguities": ["Address", "Number of people involved"], "reasoning": ["'Screaming' and 'glass breaking' suggest a violent or dangerous altercation."], "confidence": 0.90, "missing_information": ["Exact address", "Any visible weapons"], "people": ["Reporter", "Neighbor(s)"], "locations": ["Neighbor's house next door"], "hazards": ["Broken glass", "Potential assailant"], "vulnerable_people": [], "timeline": ["Happening now"], "emergency_indicators": ["screaming", "glass breaking"], "follow_up_questions": ["What is your address so we can locate the neighbor?", "Can you safely see anything from your window?"], "language_detected": "English", "sentiment": "frightened"}

Input: "I haven't seen my 85-year-old neighbor in three days and her mail is piling up."
Output: {"summary": "Welfare check requested for 85-year-old neighbor unseen for three days.", "facts": ["Neighbor is 85 years old.", "Neighbor unseen for three days.", "Mail is piling up."], "entities": ["85-year-old neighbor", "Mail"], "concerns": ["Medical emergency", "Incapacity or death"], "ambiguities": ["Neighbor's address", "Does neighbor live alone"], "reasoning": ["'85-year-old' indicates vulnerability.", "'Three days' and 'mail piling up' suggest unusual absence."], "confidence": 0.95, "missing_information": ["Neighbor's exact address", "Has anyone tried knocking"], "people": ["85-year-old neighbor", "Reporter"], "locations": ["Neighbor's residence"], "hazards": [], "vulnerable_people": ["85-year-old neighbor"], "timeline": ["Unseen for three days"], "emergency_indicators": ["haven't seen", "mail is piling up"], "follow_up_questions": ["What is her address?", "Do you know if she has family nearby?"], "language_detected": "English", "sentiment": "concerned"}

Input: "Two cars just collided head-on at the intersection. Someone looks trapped."
Output: {"summary": "Head-on two-car collision at intersection with possible entrapment.", "facts": ["Two cars collided head-on.", "Location is an intersection.", "Someone appears to be trapped."], "entities": ["Two cars", "Intersection", "Trapped person"], "concerns": ["Severe traumatic injury", "Vehicle entrapment", "Traffic hazard"], "ambiguities": ["Which intersection", "Number of injured people", "Vehicle types"], "reasoning": ["'Head-on' indicates high impact.", "'Trapped' indicates need for specialized rescue."], "confidence": 0.95, "missing_information": ["Exact intersection name", "Are there fluid leaks"], "people": ["Trapped person(s)", "Reporter"], "locations": ["Intersection"], "hazards": ["Crashed vehicles", "Traffic flow"], "vulnerable_people": ["Trapped person"], "timeline": ["Just occurred"], "emergency_indicators": ["collided head-on", "trapped"], "follow_up_questions": ["What are the cross streets of the intersection?", "Is there any smoke or fire from the vehicles?"], "language_detected": "English", "sentiment": "urgent"}

Input: "There's a man walking around the neighborhood looking into parked cars."
Output: {"summary": "Suspicious man looking into parked cars in the neighborhood.", "facts": ["A man is walking around.", "He is looking into parked cars."], "entities": ["Man", "Parked cars", "Neighborhood"], "concerns": ["Suspicious activity", "Potential theft or burglary"], "ambiguities": ["Location of neighborhood", "Description of the man", "Time of day"], "reasoning": ["'Looking into parked cars' matches patterns of attempted theft."], "confidence": 0.90, "missing_information": ["Address or street name", "Physical description of the man"], "people": ["Suspicious man", "Reporter"], "locations": ["Neighborhood"], "hazards": [], "vulnerable_people": [], "timeline": ["Happening now"], "emergency_indicators": ["looking into parked cars"], "follow_up_questions": ["What street are you on?", "Can you describe what the man is wearing?"], "language_detected": "English", "sentiment": "alert"}

Input: "My chest hurts really bad and my left arm is numb."
Output: {"summary": "Reporter experiencing severe chest pain and left arm numbness.", "facts": ["Reporter has severe chest pain.", "Reporter's left arm is numb."], "entities": ["Chest", "Left arm"], "concerns": ["Possible myocardial infarction (heart attack)", "Medical emergency"], "ambiguities": ["Address", "Reporter's age", "Other symptoms"], "reasoning": ["'Chest hurts' and 'left arm is numb' are classic indicators of a cardiac event."], "confidence": 0.98, "missing_information": ["Exact address", "Age of the patient", "History of heart problems"], "people": ["Reporter (Patient)"], "locations": ["Unknown"], "hazards": [], "vulnerable_people": ["Reporter experiencing medical crisis"], "timeline": ["Happening now"], "emergency_indicators": ["chest hurts really bad", "left arm is numb"], "follow_up_questions": ["What is your exact location?", "Are you alone?"], "language_detected": "English", "sentiment": "distressed"}

Input: "Nevermind, it was just a car alarm, everything is fine."
Output: {"summary": "False alarm; reported situation was just a car alarm.", "facts": ["Situation is fine.", "Source of noise was a car alarm."], "entities": ["Car alarm"], "concerns": ["None currently"], "ambiguities": ["What the original report was"], "reasoning": ["'Nevermind' and 'everything is fine' indicate resolution of the incident."], "confidence": 0.99, "missing_information": [], "people": ["Reporter"], "locations": ["Unknown"], "hazards": [], "vulnerable_people": [], "timeline": ["Resolved now"], "emergency_indicators": ["false alarm", "everything is fine"], "follow_up_questions": ["Are you sure you don't need any assistance?"], "language_detected": "English", "sentiment": "relieved"}

Do not include markdown blocks, just the raw JSON object.
"""

class GeminiUnderstandingProvider(UnderstandingProviderPort):
    """
    AI Provider using Google Gemini.
    Delegates validation and parsing to the AIGateway.
    Falls back to MockUnderstandingProvider on failure.
    """
    
    def __init__(self, ai_gateway: AIGateway, mock_provider: MockUnderstandingProvider):
        self.ai_gateway = ai_gateway
        self.mock_provider = mock_provider
        self.fallback_occurred = False
        self.fallback_reason: Optional[str] = None
        self.last_error: Optional[str] = None
        
        # Configure Gemini SDK
        if settings.GEMINI_API_KEY:
            genai.configure(api_key=settings.GEMINI_API_KEY)
        # Using a standard text model
        self.model_name = "gemini-2.5-flash"
        
    def understand(self, request: UnderstandingRequest) -> IncidentUnderstanding:
        self.fallback_occurred = False
        self.fallback_reason = None
        self.last_error = None
        
        try:
            raw_response = self._call_gemini(request.incident_text)
            
            if not raw_response or not raw_response.strip():
                raise ProviderError("Received empty response from Gemini.")
                
            # Gateway handles all parsing and contract validation
            return self.ai_gateway.process_provider_response(raw_response)
            
        except (GoogleAPIError, RetryError, generation_types.StopCandidateException) as e:
            error_str = str(e).lower()
            if "timeout" in error_str:
                reason = "timeout"
            elif "quota" in error_str or "429" in error_str:
                reason = "quota"
            elif "api_key" in error_str or "403" in error_str:
                reason = "missing_api_key"
            else:
                reason = "provider_error"
            self._trigger_fallback(f"Gemini API or Network Failure: {str(e)}", reason)
        except AIContractError as e:
            error_str = str(e).lower()
            if "json" in error_str or "decode" in error_str:
                reason = "invalid_json"
            else:
                reason = "schema_validation"
            self._trigger_fallback(f"Gateway rejected response: {str(e)}", reason)
        except ProviderError as e:
            error_str = str(e).lower()
            if "missing_api_key" in error_str:
                reason = "missing_api_key"
            else:
                reason = "provider_error"
            self._trigger_fallback(str(e), reason)
        except Exception as e:
            self._trigger_fallback(f"Unexpected error: {str(e)}", "provider_error")
            
        # Return fallback understanding
        return self.mock_provider.understand(request)

    def _call_gemini(self, text: str) -> str:
        """Isolated SDK call for easier mocking in tests."""
        if not settings.GEMINI_API_KEY:
            raise ProviderError("missing_api_key")
            
        model = genai.GenerativeModel(
            model_name=self.model_name,
            system_instruction=SYSTEM_PROMPT
        )
        
        response = model.generate_content(
            text,
            generation_config=genai.types.GenerationConfig(
                response_mime_type="application/json"
            )
        )
        return response.text

    def _trigger_fallback(self, error_message: str, reason: str):
        self.fallback_occurred = True
        self.fallback_reason = reason
        self.last_error = error_message
        logger.warning(f"Fallback triggered | Reason: {reason} | Details: {error_message}")
        
    def health(self) -> bool:
        """
        Check if the provider is configured and available.
        """
        return bool(settings.GEMINI_API_KEY)
