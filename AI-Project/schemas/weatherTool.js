const weatherSchema = {
    type: "function",
    name: "getWeather",
    description: "Get the current weather of any city.",
    parameters: {
        type: "object",
        properties: {
            city: {
                type: "string",
                description: "Name of the city",
            },
        },
        required: ["city"],
        additionalProperties: false,
    },
};

export default weatherSchema;