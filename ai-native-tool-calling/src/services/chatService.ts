import client from "../config/aiClient.js";
import { calculatorTool } from "../tools/calculatorTool.js";
import { randomNumberTool } from "../tools/randomNumberTool.js";
import { randomNumber } from "../tools/randomNumber.js";
import { calculate } from "../tools/calculator.js";
import { toolRegistry } from "../tools/toolRegistry.js";


async function chatService(userQuery: string) {
    const response = await client.responses.create({
        model: process.env.MODEL!,
        input: userQuery,
        tools: [calculatorTool, randomNumberTool]
    })


    console.log("AI Output:", response.output);

    // 2. Find function call
    const functionCall = response.output.find(
        (item) => item.type === "function_call"
    );

    // 3. If AI doesn't want to use a tool
    if (!functionCall) {
        return response.output_text;
    }

    const args = JSON.parse(functionCall.arguments);

    console.log("Function Name:", functionCall.name);
    console.log("Arguments:", args);

    const toolName = functionCall.name as keyof typeof toolRegistry;

    const tool = toolRegistry[toolName];

    if (!tool) {
        throw new Error(`Unknown tool: ${functionCall.name}`);
    }
    // 5. Execute actual backend function
    // const result = calculate(args.expression);
    const result = tool(args);

    console.log(" Result:", result);



    console.log("Original Response ID:", response.id);
    console.log("Function Call ID:", functionCall.call_id);
    console.log("Tool Result:", result);



    // 6. Send tool result back to AI
    const finalResponse = await client.responses.create({
        model: process.env.MODEL!,

        input: `
The user asked:
${userQuery}

The tool "${functionCall.name}" was executed successfully.

Tool Result:
${result}

Answer the user's original question using the tool result.
Return only the final answer.
`
    });

    if (!finalResponse.output_text) {
        throw new Error("AI failed to generate the final response.");
    }

    // Step 7: Return final AI response
    if (!finalResponse.output_text) {
        throw new Error("AI failed to generate final response.");
    }

    console.log("Final Response:", finalResponse.output);
    console.log("Final Response Text:", finalResponse.output_text);
    // 7. Return final natural-language answer
    return finalResponse.output_text;
}


export default chatService