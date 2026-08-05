async function calculator({ a, b, operation }) {
    try {
        switch (operation) {
            case "add":
                return { result: a + b };

            case "subtract":
                return { result: a - b };

            case "multiply":
                return { result: a * b };

            case "divide":
                return { result: a / b };

            default:
                throw new Error("Invalid operation");
        }
    } catch (error) {
        console.log(error);

    }
}

export default calculator;