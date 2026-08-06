export function cleanAIResponse(response: string): string {
    // Remove markdown fences
    const cleaned = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    // Extract first JSON object
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");

    if (start === -1 || end === -1) {
        throw new Error("No JSON object found in AI response.");
    }

    return cleaned.slice(start, end + 1);
}