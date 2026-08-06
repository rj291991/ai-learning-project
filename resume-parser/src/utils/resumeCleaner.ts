export function cleanAIResponse(response: string): string {

    return response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

}