import { prompts } from "../prompts/translatorPrompts.js";
import client from "../config/aiClient.js";



async function translateText(text, targetLanguage, promptType) {

    const promptMap = {
        "role-prompting": prompts.rolePrompt,
        "context-prompting": prompts.contextPrompt,
        "output-prompting": prompts.outputPrompt
    };

    const promptBuilder = promptMap[promptType.toLowerCase()];

    if (!promptBuilder) {
        throw new Error("Invalid Prompt Type");
    }

    const prompt = promptBuilder(text, targetLanguage);

    const response = await client.responses.create({
        model: "qwen3",
        input: prompt
    });

    return response.output_text;
}


export default translateText;
