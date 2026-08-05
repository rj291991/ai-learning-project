export interface TravelRequest {
    destination: string;
    days: number
}

export interface TravelResponse {
    itinerary: string;
    budget: string;
    packingChecklist: string;
}