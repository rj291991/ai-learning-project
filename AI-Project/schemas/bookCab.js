const bookCabSchema = {
    type: "function",
    name: "bookCab",
    description: "Book a cab for the user in a given city.",
    parameters: {
        type: "object",
        properties: {
            city: {
                type: "string",
                description: "City where the cab should be booked."
            }
        },
        required: ["city"],
        additionalProperties: false
    }
};

export default bookCabSchema;
