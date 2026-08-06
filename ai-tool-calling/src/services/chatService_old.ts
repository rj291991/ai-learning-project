import client from "../config/aiClient.js";
import { prompts } from "../prompts/toolSelectorPrompt.js";
import { ToolSchema } from "../schemas/toolSchema.js";
import { calculate } from "../tools/calculator.js";
import { randomNumber } from "../tools/randomNumber.js";
import { cleanAIResponse } from "../utils/cleaner.js";

async function chatService(userQuery: string) {
    // Step 1: Ask AI to decide which tool to use
    const response = await client.responses.create({
        model: process.env.MODEL!,
        input: prompts.toolSelect(userQuery),
    });

    if (!response.output_text) {
        throw new Error("AI returned an empty response.");
    }

    // Step 2: Clean and validate AI response
    const cleanedResponse = cleanAIResponse(response.output_text);


    console.log("cleanedResponse::::", cleanedResponse)
    // let parsed;

    // try {
    //     parsed = ToolSchema.safeParse(JSON.parse(cleanedResponse));
    // } catch {
    //     throw new Error("AI returned invalid JSON.");
    // }


    const parsed = (() => {
        try {
            return ToolSchema.safeParse(
                JSON.parse(cleanedResponse)
            );
        } catch {
            throw new Error("AI returned invalid JSON.");
        }
    })();


    console.log("parsed::::::", parsed);


    if (!parsed.success) {
        console.error(parsed.error.format());
        throw new Error("Invalid AI response.");
    }

    const aiResponse: any = parsed.data;
    console.log("aiResponse.tool::::", aiResponse.tool);

    let result;
    switch (aiResponse.tool) {
        case "calculator":
            result = calculate(aiResponse);
            break;
        case "randomNumber":
            result = randomNumber(aiResponse);
            break;
        case "none":
            return aiResponse.response;
        default:
            throw new Error(`Unknown tool: ${aiResponse.tool}`);

    }

    console.log("result:::::::::::::", result)

    const finalResponse = await client.responses.create({
        model: process.env.MODEL!,
        input: prompts.finalAnswer(userQuery, result),
    });

    if (!finalResponse.output_text) {
        throw new Error("AI failed to generate the final response.");
    }

    return finalResponse.output_text;
}

export default chatService;