export function calculate(expression: string) {
    try {
        return Function(`"üse strict"; return ${expression}`)()
    } catch (e) {
        throw new Error("invalid mathematical expression")
    }
}