export function itineraryPrompt(
    destination: string,
    days: number
): string {

    return `
You are an expert travel planner.

Create a ${days}-day itinerary for ${destination}.

Requirements:

For each day include:
- Morning
- Afternoon
- Evening
- Attractions
- Local food
- Activities

Rules:
- Make the plan realistic.
- Consider travel time between places.
- Avoid duplicate attractions.
- Keep recommendations practical.

Return ONLY valid JSON.

Format:

{
  "days": [
    {
      "day": 1,
      "morning": "",
      "afternoon": "",
      "evening": "",
      "food": [],
      "activities": []
    }
  ]
}
`;
}