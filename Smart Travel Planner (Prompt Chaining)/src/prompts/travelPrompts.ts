export const prompts = {

    generateItinerary(destination: string, days: number): string {
        return ` You are an experienced travel itinerary planner.

         Context:
        The user is planning a leisure trip and wants a detailed day-wise itinerary.

        Task:
         Create a day-wise travel itinerary.

            For each day include:

            - Morning
            - Afternoon
            - Evening

            Recommend:

- Tourist attractions
- Local food
- Activities

        Input:
        Destination:
            ${destination}

            Duration:
            ${days} days

            Output:

Return the itinerary in plain text.

Do not include any additional explanation.
        
    `;
    },

    estimateBudget(itinerary: string): string {
        return `
        You are an experienced travel cost estimator.

        You will receive a travel itinerary in plain text.

        Example:

        Day 1:
        - Arrive in Tokyo
        - Check in to hotel
        - Visit Senso-ji Temple
        - Explore Asakusa
        - Dinner in Shinjuku

        Day 2:
        - Breakfast at hotel
        - Visit Tokyo Skytree
        - Explore Akihabara
        - Lunch at a local restaurant
        - Evening at Shibuya Crossing
        - Return to hotel

        Your task is to estimate the overall travel budget.

        Instructions:
        - Determine the destination and trip duration from the itinerary.
        - Assume one hotel night for every overnight stay.
        - Assume a mid-range traveler unless the itinerary clearly indicates a luxury or budget trip.
        - Estimate realistic costs for:
        - Accommodation
        - Food
        - Transport
        - Activities
        - Include local transportation whenever required.
        - Include entrance fees for attractions where applicable.
        - Use the local currency of the destination. If the destination cannot be determined, use USD.
        - Round all amounts to whole numbers.
        - Ensure totalBudget = accommodation + food + transport + activities.
        - If information is missing, make reasonable assumptions instead of returning null.
        - Do not explain your reasoning.
        - Return ONLY valid JSON.

        Output format:

        {
        "currency": "JPY",
        "accommodation": 24000,
        "food": 12000,
        "transport": 8000,
        "activities": 15000,
        "totalBudget": 59000,
        "confidence": "medium"
        }

        Confidence should be one of:
- low
- medium
- high

        Itinerary:
"""
${itinerary}
"""

    `;
    },

    generatePackingChecklist(itinerary: string, budget: string): string {
        return `
You are an expert travel packing assistant.

The user is preparing for a trip.

Your task is to generate a practical packing checklist based on the provided itinerary and estimated budget.

Instructions:
- Analyze the destination, trip duration, weather, and planned activities from the itinerary.
- Use the budget only to infer the travel style (budget, mid-range, or luxury) if relevant.
- Recommend only essential items.
- Avoid duplicate items.
- Group similar items together.
- Do not include unnecessary luxury items.
- If an item belongs to multiple categories, include it only once.
- If the destination or weather cannot be determined, assume moderate weather.
- Return only valid JSON. Do not include explanations or markdown.

Input:

Itinerary:
"""
${itinerary}
"""

Budget:
"""
${budget}
"""

Output:

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


}