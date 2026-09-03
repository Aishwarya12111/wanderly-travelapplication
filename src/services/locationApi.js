/**
 * Location & Geocoding API Service
 */

/**
 * Search locations by city or place query
 * @param {string} query - Location search string (e.g., "Bengaluru", "Tokyo")
 * @returns {Promise<Array<{name: string, country: string, latitude: number, longitude: number, region: string}>>}
 */
export async function searchLocations(query) {
  if (!query || query.trim().length < 2) return [];

  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query.trim())}&count=6&language=en&format=json`
    );

    if (!response.ok) {
      throw new Error(`Geocoding error: ${response.status}`);
    }

    const data = await response.json();
    if (!data.results || data.results.length === 0) return [];

    return data.results.map((item) => ({
      id: `${item.id || item.name.toLowerCase()}-${item.latitude}`,
      name: item.name,
      country: item.country || item.admin1 || '',
      latitude: item.latitude,
      longitude: item.longitude,
      region: item.admin1 || item.country || ''
    }));
  } catch (error) {
    console.error('[Wanderly Location API] Search error:', error);
    return [];
  }
}
