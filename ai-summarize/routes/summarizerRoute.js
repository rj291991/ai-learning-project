import express from "express";
import client from "../config/aiClient.js"
import summarizerText from "../services/summarizerService.js"

const router = express.Router()

router.post("/summarize", async(req, res) => {
    try {
        const { text, promptType } = req.body;

        if (!text || !promptType) {
            return res.status(400).json({
                success: false,
                message: "text and promptType are required."
            });
        }

        const response = await summarizerText(
            text,
            promptType
        );

        return res.json({
            success: true,
            response
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong."
        });
    }

})


export default router