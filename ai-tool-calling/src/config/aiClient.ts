import openAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new openAI({
    baseURL: process.env.OLLAMA_BASE_URL,
    apiKey: "ollama"
})

export default client;

