export const calculatorTool = {
    type: "function",
    name: "calculator",
    description: "Use this function when the user asks to calculate a mathematical expression.",
    strict: true,
    parameters: {
        type: "object",
        properties: {
            expression: {
                type: "string",
                description: "The mathematical expression to calculate, for example 25+30 or 100/4.",

            },
        },
        required: ["expression"],
        additionalProperties: false,
    },
} as const;