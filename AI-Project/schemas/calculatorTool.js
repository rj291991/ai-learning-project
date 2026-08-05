const calculatorSchema = {
    type: "function",
    name: "calculator",
    description: "Perform basic arithmetic operations.",
    parameters: {
        type: "object",
        properties: {
            a: {
                type: "number",
                description: "First number"
            },
            b: {
                type: "number",
                description: "Second number"
            },
            operation: {
                type: "string",
                enum: ["add", "subtract", "multiply", "divide"],
                description: "Operation to perform"
            }
        },
        required: ["a", "b", "operation"],
        additionalProperties: false
    }
}

export default calculatorSchema;
