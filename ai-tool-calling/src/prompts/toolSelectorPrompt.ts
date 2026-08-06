export const prompts = {
    toolSelect(userQuery: string): string {
        return `
You are an AI assistant.

Available Tools:

1. Calculator
   Use when the user asks mathematical calculations.

Arguments:
{
  "expression": "string"
}

2. Random Number
   Use when the user wants a random number.

Arguments:
{
  "min": number,
  "max": number
}

3. Date Time
   Use when the user asks current date or time.

Arguments:
{}

Task:
- Analyze the user's request.
- Decide which tool should be used.
- Return ONLY valid JSON.

Output Examples:

Calculator:

{
  "tool": "calculator",
  "expression": "25+30"
}

Random Number:

{
  "tool": "randomNumber",
  "min": 1,
  "max": 100
}

Date Time:

{
  "tool": "dateTime"
}

No Tool:

{
  "tool": "none",
  "response": "Hello!"
}

User Query:
"""
${userQuery}
"""
`;
    },

    finalAnswer(userQuery: string, calculationResult: number): string {
        return `
You are a helpful AI assistant.

Context:
A calculator tool has already executed successfully.

Task:
Generate a short, natural and user-friendly response.

User Question:
${userQuery}

Calculator Result:
${calculationResult}

Instructions:
- Do not explain the calculation unless the user asks.
- Keep the response short.
- Return only the final response.
`;
    },
    randomNumber(userQuery: string) {

        return `You are an AI Tool Selector.

Context:
The user can ask any type of question.

Your job is to determine whether the Random Number tool is required.

Task:
- Analyze the user's query.
- If the user asks to generate a random number, use the Random Number tool.
- Extract the minimum and maximum values if they are mentioned.
- If no range is provided, use:
  min = 1
  max = 100.
- If the query does not require a random number, do not use the tool.

Instructions:
- Return ONLY valid JSON.
- Do not include explanations.
- Do not include markdown.

Output Format

For Random Number:

{
    "tool": "randomNumber",
    "min": 1,
    "max": 100
}

For Normal Conversation:

{
    "tool": "none",
    "response": ""
}

User Query:
"""
${userQuery}
"""
        `

    }
};