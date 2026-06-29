import { AnalysisRequest, AnalysisResponse } from "@/types/analysis";

const fetchWithTimeoutAndRetry = async (url: string, options: RequestInit, retries = 1, timeoutMs = 25000): Promise<Response> => {
  for (let i = 0; i <= retries; i++) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(id);
      
      if (!response.ok && response.status >= 500 && i < retries) {
        console.warn(`Attempt ${i + 1} failed with status ${response.status}. Retrying...`);
        await new Promise(res => setTimeout(res, 1000 * (i + 1))); // Exponential backoff
        continue;
      }
      
      return response;
    } catch (error: unknown) {
      clearTimeout(id);
      const isAbortError = error instanceof Error && error.name === 'AbortError';
      
      if (i < retries) {
        console.warn(`Attempt ${i + 1} failed due to ${isAbortError ? 'timeout' : 'network error'}. Retrying...`);
        await new Promise(res => setTimeout(res, 1000 * (i + 1)));
        continue;
      }
      
      if (isAbortError) {
        throw new Error("The Intelligence Engine took too long to respond. Please try again.");
      }
      throw error;
    }
  }
  throw new Error("Unable to contact the Intelligence Engine.");
};

export async function analyzeIncident(request: AnalysisRequest): Promise<AnalysisResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  try {
    const response = await fetchWithTimeoutAndRetry(`${apiUrl}/api/v1/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    }, 1, 30000); // 1 retry, 30s timeout per request

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `API returned status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to analyze incident:", error);
    if (error instanceof Error) {
      throw error; // Throw the exact error (e.g. timeout or specific message)
    }
    throw new Error("Unable to contact the Intelligence Engine. Please check your connection.");
  }
}
