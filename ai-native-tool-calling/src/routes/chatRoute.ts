import express, { type Request, type Response } from "express";
import chatService from "../services/chatService.js";

const router = express.Router();

router.post("/chat", async (req: Request, res: Response) => {
    try {
        const { userMessage } = req.body;

        if (!userMessage) {
            return res.status(400).json({
                success: false,
                message: "userMessage is required"
            });
        }

        const result = await chatService(userMessage);

        return res.status(200).json({
            success: true,
            message: result
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

export default router;