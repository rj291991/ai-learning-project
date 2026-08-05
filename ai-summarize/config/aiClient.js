import openAI from "openai"
import dotenv from "dotenv"
dotenv.config();

const client = new openAI({
    baseUrl:process.env.baseUrl,
    apikey:"ollama"
})


export default client;

