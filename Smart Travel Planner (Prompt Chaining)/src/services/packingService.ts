import client from "../config/aiClient.js";
import { packingPrompt } from "../prompts/packingPrompt.js";


export async function generatePacking(
    itinerary:any
){

    const prompt =
        packingPrompt(
            JSON.stringify(itinerary)
        );


    const response =
        await client.responses.create({

            model:"qwen3:latest",

            input:prompt
        });


    return JSON.parse(
        response.output_text
    );

}