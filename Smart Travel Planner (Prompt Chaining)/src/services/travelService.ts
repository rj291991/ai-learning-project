import { generateItinerary } from "./itineraryService.js";
import { calculateBudget } from "./budgetService.js";
import { generatePacking } from "./packingService.js";


export async function generateTravelPlan(
    destination: string,
    days: number
) {

    try {

        // Step 1: Generate itinerary
        const itinerary = await generateItinerary(
            destination,
            days
        );

        // Step 2 & 3: Run after itinerary
        // Budget + Packing parallel
        const [budget, packingChecklist] = await Promise.all([calculateBudget(itinerary), generatePacking(itinerary)]);
        return {
            destination,
            days,
            itinerary,
            budget,
            packingChecklist
        };


    } catch (error) {

        console.error(
            "Travel service error:",
            error
        );

        throw new Error(
            "Failed to generate travel plan"
        );
    }
}