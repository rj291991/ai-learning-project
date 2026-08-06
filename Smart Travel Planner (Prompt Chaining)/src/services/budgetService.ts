export async function calculateBudget(
    itinerary: any
) {

    const days = itinerary.days.length;


    const accommodation = days * 3000;
    const food = days * 1200;
    const transport = days * 800;
    const activities = days * 1500;


    return {
        currency: "INR",
        accommodation,
        food,
        transport,
        activities,
        totalBudget:
            accommodation +
            food +
            transport +
            activities
    };
}