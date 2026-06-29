export interface Coordinates {
  lat: number;
  lon: number;
  display_name: string;
  confidence_score?: number; // 0-1
}

const geocodeCache = new Map<string, Coordinates>();

/**
 * Normalizes location strings to improve cache hits
 */
function normalizeLocationString(loc: string): string {
  return loc.toLowerCase().trim().replace(/\s+/g, ' ');
}

/**
 * Calculates a heuristic confidence score based on the string specificity
 * - Full address (contains numbers, commas) -> High confidence
 * - Just a city/landmark -> Medium confidence
 */
function estimateGeocodingConfidence(loc: string): number {
  let confidence = 0.6; // Base confidence
  
  if (/\d+/.test(loc)) confidence += 0.2; // Contains numbers (street numbers)
  if (loc.includes(',')) confidence += 0.1; // Contains commas (usually City, State)
  
  return Math.min(confidence, 0.95); // Cap at 95%
}

export async function geocodeLocation(location: string, retryCount = 1): Promise<Coordinates | null> {
  const normalized = normalizeLocationString(location);
  
  if (geocodeCache.has(normalized)) {
    return geocodeCache.get(normalized) || null;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(normalized)}&format=json&limit=1`, {
      signal: controller.signal,
      headers: {
        'Accept-Language': 'en-US,en;q=0.9',
        // 'User-Agent': 'SamaLink/1.0' // OpenStreetMap recommends providing a user agent for nominatim
      }
    });
    
    clearTimeout(timeout);

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
    const data = await res.json();
    
    if (data && data.length > 0) {
      const coords: Coordinates = {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
        display_name: data[0].display_name,
        confidence_score: estimateGeocodingConfidence(location)
      };
      geocodeCache.set(normalized, coords);
      return coords;
    }
    
    return null;
  } catch (error) {
    if (retryCount > 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return geocodeLocation(location, retryCount - 1);
    }
    console.error("Geocoding error for location:", location, error);
    return null;
  }
}
