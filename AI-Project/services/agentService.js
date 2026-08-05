import client from "../config/aiClient.js";

import tools from "../schemas/index.js";
import agentPrompt from "../prompts/agentPrompt.js";
import executeTools from "../utils/executeTools.js";

async function runAgent(userMessage) {

    let iterations = 0;
    const MAX_ITERATIONS = 10;

    let previousResponseId = null;

    let currentInput = userMessage;

    while (iterations < MAX_ITERATIONS) {
        iterations++;
        // const response = await client.responses.create({
        //     model: "qwen3",
        //     input: currentInput,
        //     tools,
        //     ...(previousResponseId && {
        //         previous_response_id: previousResponseId,
        //     }),
        // });
        console.log("currentInput:", JSON.stringify(currentInput, null, 2));
        const response = await client.responses.create({
            model: "qwen3",
            instructions: agentPrompt,
            input: currentInput,
            tools,
            ...(previousResponseId && {
                previous_response_id: previousResponseId,
            }),
        });
        console.log("=================================");
        // console.log("Iteration:", iterations);
        // console.log("Response Output:");
        console.log(JSON.stringify(response.output, null, 2));
        console.log("Previous Response Id:", previousResponseId);

        console.log("response.id:", response.id);
        // yahan function_call check hoga
        const functionCalls = response.output.filter(
            item => item.type === "function_call"
        );

        if (functionCalls.length === 0) {
            return response.output_text;
        }

        console.log("functionCalls:", functionCalls);

        const toolOutputs = await executeTools(functionCalls);

        currentInput = toolOutputs;
        previousResponseId = response.id

    }
    throw new Error(
        `Agent exceeded maximum iterations (${MAX_ITERATIONS})`
    );
}


export default runAgent;