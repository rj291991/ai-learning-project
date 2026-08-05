import express from "express";
import runAgent from "../services/agentService.js";

const router = express.Router()

router.post("/chat", async (req, res) => {

    try {
        const { userMessage } = req.body;

        if (!userMessage) {
            return res.status(400).json({
                message: "User prompt is empty"
            });
        }
        const response = await runAgent(userMessage);
        return res.json({
            response
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
});

export default router;