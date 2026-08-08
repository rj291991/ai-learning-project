export const randomNumberTool = {
    type: "function",
    name: "randomNumber",

    description:
        "Generate a random integer between the minimum and maximum values explicitly provided by the user. Preserve the numeric values from the user's request exactly. Do not swap, reverse, or automatically correct the min and max values. If the user provides a range where min is greater than max, pass the values exactly as provided so the backend can validate the range.",

    strict: true,

    parameters: {
        type: "object",

        properties: {
            min: {
                type: "number",
                description:
                    "The first numeric boundary explicitly provided by the user. Preserve its value exactly."
            },

            max: {
                type: "number",
                description:
                    "The second numeric boundary explicitly provided by the user. Preserve its value exactly."
            }
        },

        required: ["min", "max"],

        additionalProperties: false
    }
} as const;