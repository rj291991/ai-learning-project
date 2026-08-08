import client from "../config/aiClient.js";
import { calculatorTool } from "../tools/calculatorTool.js";
import { randomNumberTool } from "../tools/randomNumberTool.js";
import { toolRegistry } from "../tools/toolRegistry.js";
import { executeTool } from "../tools/executeTool.js";

const tools = [
    calculatorTool,
    randomNumberTool
];

async function chatService(userQuery: string) {

    // Step 1: Ask the model whether a tool is required
    const response = await client.responses.create({
        model: process.env.MODEL!,
        instructions: `
You are an AI assistant that uses tools to answer user requests.

Rules:
- Use a tool when the user's request requires it.
- Do not invent tool results.
- Preserve tool arguments from the user's request.
- If a tool returns success=false, explain the actual error to the user.
- Do not claim that a tool is missing or not installed unless that is actually the error.
`,
        input: userQuery,
        tools
    });

    console.log("AI Output:", response.output);

    // Step 2: Find function call
    const functionCall = response.output.find(
        (item) => item.type === "function_call"
    );

    // Step 3: No tool required
    if (!functionCall) {
        return response.output_text;
    }

    console.log("Function Name:", functionCall.name);
    console.log("Raw Arguments:", functionCall.arguments);

    // Step 4: Parse arguments
    let args: unknown;

    try {
        args = JSON.parse(functionCall.arguments);
    } catch {
        throw new Error("AI returned invalid function arguments.");
    }

    console.log("Parsed Arguments:", args);

    // Step 5: Resolve tool from registry
    const toolName = functionCall.name as keyof typeof toolRegistry;

    let toolResult: string;

    try {

        const result = executeTool(toolName, args);

        console.log("Tool Result:", result);

        toolResult = JSON.stringify({
            success: true,
            result
        });

    } catch (error) {

        console.error("Tool execution failed:", error);

        toolResult = JSON.stringify({
            success: false,
            error: error instanceof Error
                ? error.message
                : "Tool execution failed"
        });
    }

    console.log("Tool Output:", toolResult);

    // Step 6: Send tool result back to the model
    const finalResponse = await client.responses.create({
        model: process.env.MODEL!,
        previous_response_id: response.id,
        input: [
            {
                type: "function_call_output",
                call_id: functionCall.call_id,
                output: toolResult
            }
        ]
    });

    // Step 7: Validate final response
    if (!finalResponse.output_text) {
        throw new Error("AI failed to generate final response.");
    }

    console.log(
        "Final Response Text:",
        finalResponse.output_text
    );

    return finalResponse.output_text;
}

export default chatService;