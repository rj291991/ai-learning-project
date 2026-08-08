export const randomNumberTool = {
    type: "function",
    name: "randomNumber",
    desciption: "Use this function when the user asks you to generate a random number within a specified range.",
    strict: true,
    parameters: {
        type: "object",
        properties: {
            min: {
                type: "number",
                description: "The minimum value of the range."
            },
            max: {
                type: "number",
                description: "The maximum value of the range."
            }
        },
        required: ["min", "max"],
        additionalProperties: false
    }
} as const