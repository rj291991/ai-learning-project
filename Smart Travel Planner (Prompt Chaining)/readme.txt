===========================================
Smart Travel Planner (Prompt Chaining)
===========================================

Project Overview
----------------
Smart Travel Planner is an AI-powered application that demonstrates the Prompt Chaining technique.

The application generates:
1. Travel Itinerary
2. Travel Budget Estimation
3. Packing Checklist

Each AI response is passed as input to the next prompt, making it a practical implementation of Prompt Chaining.

-------------------------------------------
Project Flow
-------------------------------------------

User Input
    |
    |-- Destination
    |-- Number of Days
    |
    V
Generate Itinerary
    |
    V
Estimate Budget
    |
    V
Generate Packing Checklist
    |
    V
Return Final Response

-------------------------------------------
Prompt Chaining
-------------------------------------------

Prompt 1
---------
Generate a day-wise travel itinerary.

↓

Prompt 2
---------
Use the generated itinerary to estimate:
- Accommodation
- Food
- Transport
- Activities
- Total Budget

↓

Prompt 3
---------
Use:
- Itinerary
- Budget

to generate a complete packing checklist.

-------------------------------------------
Project Structure
-------------------------------------------

src/

│
├── app.ts
│
├── config/
│     └── aiClient.ts
│
├── prompts/
│     └── travelPrompts.ts
│
├── routes/
│     └── travelRoute.ts
│
├── services/
│     └── travelService.ts
│
└── types/
      └── travel.ts

-------------------------------------------
Tech Stack
-------------------------------------------

- TypeScript
- Node.js
- Express.js
- OpenAI SDK
- Ollama
- Prompt Engineering

-------------------------------------------
API Endpoint
-------------------------------------------

POST /travel-plan

-------------------------------------------
Request
-------------------------------------------

{
    "destination":"Manali",
    "days":3
}

-------------------------------------------
Response
-------------------------------------------

{
    "success": true,
    "response": {
        "itinerary": "...",
        "budget": "...",
        "packingChecklist": "..."
    }
}

-------------------------------------------
Prompt Engineering Techniques Used
-------------------------------------------

✔ Role Prompting

✔ Context Prompting

✔ Task Prompting

✔ Output Formatting

✔ Prompt Chaining

-------------------------------------------
Learning Outcomes
-------------------------------------------

By completing this project, I learned:

• Designing AI prompts for different tasks.

• Breaking a complex workflow into multiple AI prompts.

• Passing one prompt's output to another.

• Implementing Prompt Chaining using TypeScript.

• Building modular AI services.

• Organizing prompts, services, and routes using clean architecture.

-------------------------------------------
Future Improvements
-------------------------------------------

• Real hotel price API

• Weather API integration

• Flight price estimation

• Google Maps integration

• Travel recommendation engine

• Multi-language support

• PDF itinerary generation

-------------------------------------------
Interview Explanation
-------------------------------------------

Q. Explain Prompt Chaining.

Prompt Chaining is a technique where multiple prompts are executed sequentially.
The output of one prompt becomes the input for the next prompt.

In this project:

Step 1:
Generate the travel itinerary.

↓

Step 2:
Use the itinerary to estimate the travel budget.

↓

Step 3:
Use both the itinerary and budget to generate a packing checklist.

This allows the AI to solve a complex problem by dividing it into smaller tasks.

-------------------------------------------
End
-------------------------------------------