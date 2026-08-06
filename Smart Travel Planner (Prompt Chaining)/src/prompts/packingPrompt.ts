// src/prompts/packingPrompt.ts

export function packingPrompt(
    itinerary: string
): string {

    return `
You are an expert travel packing assistant.

Generate a packing checklist based on this itinerary:

${itinerary}

Consider:
- Destination
- Weather
- Duration
- Activities

Return ONLY valid JSON.

Format:

{
  "clothing": [],
  "documents": [],
  "electronics": [],
  "medicines": [],
  "toiletries": [],
  "footwear": [],
  "essentials": []
}
`;
}