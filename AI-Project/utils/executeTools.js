import toolRegistry from "../registry/toolRegistry.js";

async function executeToolsParallel(functionCalls) {

    const promises = functionCalls.map(async (call) => {

        const args = JSON.parse(call.arguments);

        const fn = toolRegistry[call.name];

        if (!fn) {
            throw new Error(`Tool "${call.name}" not found`);
        }

        const result = await fn(args);

        return {
            type: "function_call_output",
            call_id: call.call_id,
            output: JSON.stringify(result)
        };
    });

    return await Promise.all(promises);
}

export default executeToolsParallel;