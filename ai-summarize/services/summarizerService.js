import client from "../config/aiClient.js";
import { prompts } from "../prompts/summarizerPrompts.js";


async function summarizerText(text, promptType) {

    const promptMap = {
        "basic-summary": prompts.basicSummary,
        "context-prompting": prompts.contextPrompting,
        "output-formatting": prompts.outputFormatting
    }


    const promptBuilder = promptMap[promptType.toLowerCase()]


    if (!promptBuilder) {
        throw new Error("Invalid Prompt Type");
    }

    const prompt = promptBuilder(text);

    const response = await client.responses.create({
        model: "qwen3",
        input: prompt
    });

    return response.output_text;
}

export default summarizerText;