import express, { type Request, type Response } from "express";
import calculateService from "../services/chatService.js";

const router = express.Router();

router.post("/calculate", async (req: Request, res: Response) => {
    try {
        const { userMessage } = req.body;
        if (!userMessage || !userMessage.trim()) {
            return res.status(400).json({
                success: false,
                message: "userMessage is required"
            })
        }

        const result = await calculateService(userMessage)
        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (e) {
        console.error("Chat Route Error:", e);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }


})

export default router