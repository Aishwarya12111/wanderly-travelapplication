/**
 * Image API Service - Integrates with Pexels API with high-res curated fallbacks.
 */

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

// Cache fetched images to avoid redundant network calls
const imageCache = new Map();

/**
 * Fetch a high quality image for a query string.
 * @param {string} query - Keyword to search (e.g., "Paris Eiffel Tower")
 * @param {string} fallbackUrl - Default high-res fallback image if API key is missing or call fails
 * @returns {Promise<string>} Image URL
 */
export async function fetchDestinationImage(query, fallbackUrl = '') {
  if (!query) return fallbackUrl;

  const cacheKey = query.toLowerCase().trim();
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey);
  }

  // If no Pexels API key, return the high quality curated fallback URL
  if (!PEXELS_API_KEY || PEXELS_API_KEY.trim() === '') {
    const defaultUrl = fallbackUrl || `https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop`;
    imageCache.set(cacheKey, defaultUrl);
    return defaultUrl;
  }

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: PEXELS_API_KEY
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }

    const data = await response.json();
    if (data.photos && data.photos.length > 0) {
      const imageUrl = data.photos[0].src.large2x || data.photos[0].src.large;
      imageCache.set(cacheKey, imageUrl);
      return imageUrl;
    }
  } catch (error) {
    console.warn(`[Wanderly Image API] Falling back to default image for query "${query}":`, error.message);
  }

  const fallback = fallbackUrl || `https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop`;
  imageCache.set(cacheKey, fallback);
  return fallback;
}
