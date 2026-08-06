import client from "../config/aiClient.js"
import { ResumeSchema } from "../schemas/resumeSchema.js"
import { prompts } from "../prompts/resumePrompts.js"
import { cleanAIResponse } from "../utils/resumeCleaner.js"


async function parseResume(resume: string) {


    // for (let attempt = 1; attempt <= 2; attempt++) {
    const response = await client.responses.create({
        model: "llama3.2:3b",
        input: prompts.parseResume(resume)
    })

    const aiResponse = cleanAIResponse(response.output_text);

    try {
        const parsedResponse = JSON.parse(aiResponse);
        const result = ResumeSchema.safeParse(parsedResponse);

        if (!result.success) {
            console.error(result.error);

            throw new Error("AI returned an invalid resume format.");
        }

        return result.data;

    } catch (e) {
        console.error(e);
        // if (attempt === 2) {
            throw new Error("AI returned invalid structured data.");
        // }

    }
}

// }

export default parseResume;