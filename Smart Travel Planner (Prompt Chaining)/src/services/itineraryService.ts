import client from "../config/aiClient.js";
import { itineraryPrompt } from "../prompts/itineraryPrompt.js";


export async function generateItinerary(
    destination:string,
    days:number
){

    const prompt =
        itineraryPrompt(
            destination,
            days
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