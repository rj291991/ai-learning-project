import express from "express";
import client from "./config/aiClient.js";

const app = express();
app.use(express.json())




app.post("/chat", async (req, res) => {
    const { userMessage } = req.body;

    if (!userMessage) {
        return res.status(400).json({
            message: "User prompt is empty"
        });
    }

    // const tools = [
    //     {
    //         type: "function",
    //         name: "getWeather",
    //         description: "Get the current weather of any city.",
    //         parameters: {
    //             type: "object",
    //             properties: {
    //                 city: {
    //                     type: "string",
    //                     description: "Name of the city",
    //                 },
    //             },
    //             required: ["city"],
    //             additionalProperties: false,
    //         },
    //     },
    //     {
    //         type: "function",
    //         name: "calculator",
    //         description: "Perform basic arithmetic operations.",
    //         parameters: {
    //             type: "object",
    //             properties: {
    //                 a: {
    //                     type: "number",
    //                     description: "First number"
    //                 },
    //                 b: {
    //                     type: "number",
    //                     description: "Second number"
    //                 },
    //                 operation: {
    //                     type: "string",
    //                     enum: ["add", "subtract", "multiply", "divide"],
    //                     description: "Operation to perform"
    //                 }
    //             },
    //             required: ["a", "b", "operation"],
    //             additionalProperties: false
    //         }
    //     }
    // ];

    // const response = await client.responses.create({
    //     model: "qwen3",
    //     // instructions: toolPrompt,
    //     input: userMessage,
    //     tools,
    // })

    // console.log('response:::::::::::::::::::::', response);
    // console.log('response.output:::::::::::::::::::::', response.output);
    // const functionCalls = response.output.filter(
    //     item => item.type === "function_call"
    // );


    // console.log("CALLING TOOL:", functionCalls);
    // const toolOutputs = [];
    // for (const call of functionCalls) {
    //     const args = JSON.parse(call.arguments);
    //     // console.log('toolRegistry[call.name]', toolRegistry[call.name])
    //     const fn = toolRegistry[call.name]
    //     // console.log("fn::::::::::::::", fn)
    //     if (!fn) {
    //         throw new Error(`Tool ${call.name} not found`);
    //     }

    //     const result = await fn(args);

    //     toolOutputs.push({
    //         type: "function_call_output",
    //         call_id: call.call_id,
    //         output: JSON.stringify(result),
    //     });

    // }


    // const toolOutputs = await Promise.allSettled(
    //     functionCalls.map(async (call) => {
    //         const args = JSON.parse(call.arguments);
    //         const fn = toolRegistry[call.name]
    //         if (!fn) {
    //             throw new Error(`Tool ${call.name} not found`);
    //         }
    //         const result = await fn(args);
    //         return {
    //             type: "function_call_output",
    //             call_id: call.call_id,
    //             output: JSON.stringify(result),
    //         }

    //     })
    // )


    // const successfulOutputs = toolOutputs.filter((result) => result.status == "fulfilled").map((result) => result.value);
    // // console.log('toolOutputs', toolOutputs)

    // const finalResponse = await client.responses.create({
    //     model: "qwen3",
    //     previous_response_id: response.id,
    //     input: [
    //         // ...toolOutputs,
    //         ...successfulOutputs,
    //         {
    //             type: "message",
    //             role: "system",
    //             content: "Only use the provided tool outputs. Do not generate or guess any values."
    //         }
    //     ]
    // });

    // // console.log("finalResponse.output_text:", finalResponse.output_text)
    // console.log(JSON.stringify(finalResponse.output, null, 2));
    // return res.json({
    //     response: finalResponse.output_text
    // });
});


app.listen(4000, () => {
    console.log("Server running on port 4000");
})


