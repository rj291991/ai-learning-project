import { link } from "node:fs";
import client from "../config/aiClient.js";
import { prompts } from "../prompts/travelPrompts.js";
import type { TravelRequest, TravelResponse } from "../types/travel.js";


async function generateTravelPlan(
    destination: string,
    days: number
): Promise<TravelResponse> {


    try {
        // Step1 generate itinerary
        const itineraryPrompt = prompts.generateItinerary(destination, days);
        console.log("itineraryPrompt:::::::::::::");
        const inineraryResponse = await client.responses.create({
            model: "qwen3:latest",
            input: itineraryPrompt
        })

        console.log("inineraryResponse:::::::::::::");

        const itinerary = inineraryResponse.output_text;


        // Step 2: Estimate Budget
        const budgetPrompt = prompts.estimateBudget(itinerary);
        console.log("budgetPrompt:::::::::::::");
        const budgetResponse = await client.responses.create({
            model: "qwen3:latest",
            input: budgetPrompt
        })

        const budget = budgetResponse.output_text;

        //step3 Generate packing checklist
        const packingPrompt = prompts.generatePackingChecklist(itinerary, budget);
        console.log("packingPrompt:::::::::::::");
        const packingResponse = await client.responses.create({
            model: "qwen3:latest",
            input: packingPrompt
        })
        console.log("packingResponse:::::::::::::");
        const packingChecklist = packingResponse.output_text;

        return {
            itinerary,
            budget,
            packingChecklist
        };

    } catch (error) {
        console.log("Error inside :::::::::::::::::::::::::", error)
        throw new Error("Failed to generate travel plan");
    }

}


export default generateTravelPlan;