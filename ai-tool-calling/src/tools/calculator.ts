export function calculate(expression: string): number {
    try {
        const result = Function(`"use strict"; return (${expression})`)();
        return result;
    } catch {

        throw new Error("Invalid mathematical expression.");
    }
}