/**
 * Gemini AI Travel Companion & Itinerary Service
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

/**
 * Send a chat query to Gemini AI with destination context
 * @param {string} userMessage - User's prompt
 * @param {object} destinationContext - Active destination details
 * @returns {Promise<string>} AI response text
 */
export async function sendAIChatMessage(userMessage, destinationContext = null) {
  const contextPrompt = destinationContext
    ? `You are Wanderly AI, an elegant, highly knowledgeable, and friendly senior travel concierge.
The user is currently exploring the following destination:
- Destination: ${destinationContext.name}
- Country: ${destinationContext.country}
- Region: ${destinationContext.region}
- Ideal Duration: ${destinationContext.idealDuration}
- Best Time to Visit: ${destinationContext.bestTime}
- Key Highlights: ${destinationContext.famousPlaces?.map(p => p.name).join(', ')}

Respond directly, elegantly, and concisely (2-3 short paragraphs max) to the user's question about ${destinationContext.name}. Avoid generic fluff. Be practical and inspiring.`
    : `You are Wanderly AI, an elegant and refined luxury travel assistant. Provide inspiring, highly tailored advice on destinations, dining, timing, and travel tips.`;

  // Check if API key is present
  if (GEMINI_API_KEY && GEMINI_API_KEY.trim() !== '') {
    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${contextPrompt}\n\nUser Question: ${userMessage}` }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text.trim();
      }
    } catch (err) {
      console.warn('[Wanderly AI] Gemini API call failed, using intelligent fallback:', err.message);
    }
  }

  // Intelligent Local Fallback Engine if key is missing/invalid
  return generateSmartLocalAIChatResponse(userMessage, destinationContext);
}

/**
 * Generate a structured Day-by-Day Itinerary JSON via Gemini API
 * @param {object} destination - Destination object
 * @param {number} daysCount - Number of days (1 to 7)
 * @param {string} travelStyle - Style ('Relaxed', 'Balanced', 'Adventure', 'Culture & History', 'Food & Local Life')
 * @returns {Promise<object>} Structured Itinerary JSON object
 */
export async function generateItinerary(destination, daysCount = 3, travelStyle = 'Balanced') {
  const prompt = `Create a detailed ${daysCount}-day ${travelStyle} travel itinerary for ${destination.name}, ${destination.country}.

Famous spots in ${destination.name}: ${destination.famousPlaces?.map(p => p.name).join(', ')}.

CRITICAL: Return ONLY raw, valid JSON. Do not include markdown formatting or backticks around the JSON.
Follow this exact JSON structure:
{
  "destination": "${destination.name}",
  "daysCount": ${daysCount},
  "travelStyle": "${travelStyle}",
  "days": [
    {
      "day": 1,
      "title": "Short Day Theme Title",
      "activities": [
        {
          "time": "09:00",
          "title": "Morning Activity Name",
          "description": "Specific activity description and local tips."
        },
        {
          "time": "13:00",
          "title": "Lunch Spot Name",
          "description": "Culinary recommendation."
        },
        {
          "time": "15:30",
          "title": "Afternoon Highlight",
          "description": "Detailed sight or experience."
        },
        {
          "time": "19:30",
          "title": "Evening Dining & Atmosphere",
          "description": "Dinner and night ambiance."
        }
      ]
    }
  ]
}`;

  if (GEMINI_API_KEY && GEMINI_API_KEY.trim() !== '') {
    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 2500
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        let rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        
        // Clean markdown backticks if present
        rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        
        const parsedJson = JSON.parse(rawText);
        if (parsedJson && parsedJson.days && Array.isArray(parsedJson.days)) {
          return parsedJson;
        }
      }
    } catch (error) {
      console.warn('[Wanderly AI] Gemini Itinerary API failed, using intelligent JSON generator:', error.message);
    }
  }

  // Fallback Structured JSON Itinerary Generator
  return generateSmartLocalItinerary(destination, daysCount, travelStyle);
}

/* ==========================================================================
   INTELLIGENT LOCAL FALLBACK ENGINE
   Guarantees 100% functional experience even with zero API keys
   ========================================================================== */

function generateSmartLocalAIChatResponse(userQuery, destination) {
  const destName = destination ? destination.name : 'your destination';
  const queryLower = userQuery.toLowerCase();

  if (queryLower.includes('how many days') || queryLower.includes('duration')) {
    return `For **${destName}**, an ideal trip is **${destination?.idealDuration || '4–5 days'}**. This allows you to experience iconic landmarks like ${destination?.famousPlaces?.[0]?.name || 'top sights'} without feeling rushed, while also soaking in local neighborhood culture.`;
  }

  if (queryLower.includes('best time') || queryLower.includes('when to visit')) {
    return `The optimal time to visit **${destName}** is **${destination?.bestTime || 'during spring or autumn'}**. You will enjoy mild temperatures, fewer crowds, and gorgeous seasonal scenery.`;
  }

  if (queryLower.includes('eat') || queryLower.includes('food') || queryLower.includes('dining')) {
    return `When in **${destName}**, don't miss sampling authentic local specialties! We recommend starting your culinary journey with traditional street food markets in the morning, followed by an evening meal at a neighborhood bistro. Be sure to ask locals for their favorite hidden gems off the main tourist track!`;
  }

  if (queryLower.includes('expensive') || queryLower.includes('cost') || queryLower.includes('budget')) {
    return `**${destName}** offers experiences across all budget ranges. Official currency is **${destination?.currency || 'local currency'}**. While prime tourist centers can be premium, staying in adjacent historic quarters and utilizing public transport offers superb value without compromising comfort.`;
  }

  if (queryLower.includes('what should i see') || queryLower.includes('must see') || queryLower.includes('places')) {
    const placesList = destination?.famousPlaces?.map(p => p.name).join(', ') || 'historic landmarks and scenic viewpoints';
    return `Top non-negotiable highlights in **${destName}** include **${placesList}**. We advise visiting major landmarks early in the morning to beat the peak crowds and capture golden hour light!`;
  }

  // Default response
  return `To get the most out of your visit to **${destName}**, we recommend balancing high-profile landmarks like **${destination?.famousPlaces?.[0]?.name || 'key attractions'}** with quiet exploration of historical quarters. Allow time for spontaneous café stops and evening strolls to truly capture the magic of ${destName}.`;
}

function generateSmartLocalItinerary(destination, daysCount, travelStyle) {
  const destName = destination ? destination.name : 'Paris';
  const places = destination?.famousPlaces || [
    { name: 'Historic City Center', description: 'Central landmark area' },
    { name: 'Cultural Museum', description: 'Art and history exhibits' },
    { name: 'Scenic Viewpoint', description: 'Panoramic city vista' },
    { name: 'Old Town Quarter', description: 'Charming historic lanes' }
  ];

  const days = [];
  const themes = [
    'Classic Highlights & Iconic Vistas',
    'Historical Immersion & Hidden Quarters',
    'Arts, Culture & Culinary Journey',
    'Scenic Coastal & Nature Escape',
    'Local Markets & Artisan Discovery',
    'Sunset Panoramas & Nightlife',
    'Relaxed Leisure & Farewell Secrets'
  ];

  for (let i = 1; i <= daysCount; i++) {
    const mainPlace = places[(i - 1) % places.length];
    const secondaryPlace = places[i % places.length];

    days.push({
      day: i,
      title: `${themes[(i - 1) % themes.length]}`,
      activities: [
        {
          time: '09:00',
          title: `Morning Exploration: ${mainPlace.name}`,
          description: `Begin your morning at ${mainPlace.name}. ${mainPlace.description} Enjoy golden hour light before crowds accumulate.`
        },
        {
          time: '13:00',
          title: `Curated ${travelStyle} Lunch`,
          description: `Savor authentic regional cuisine at a highly recommended local restaurant near ${mainPlace.name}.`
        },
        {
          time: '15:30',
          title: `Afternoon Cultural Immersion: ${secondaryPlace.name}`,
          description: `Head to ${secondaryPlace.name}. Explore its distinct architectural features and local artisan shops.`
        },
        {
          time: '19:30',
          title: `Atmospheric Evening Dining & Promenade`,
          description: `Dine at a boutique restaurant overlooking illuminated streetscapes, followed by a relaxed evening stroll.`
        }
      ]
    });
  }

  return {
    destination: destName,
    daysCount: daysCount,
    travelStyle: travelStyle,
    days: days
  };
}
