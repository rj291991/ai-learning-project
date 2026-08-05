import express from "express";
import client from "../config/aiClient.js";
import translateText from "../services/translatorService.js";





const router = express.Router();

router.post("/translate", async (req, res) => {

    try {

        const { text, targetLanguage, promptType } = req.body;

        // Input Validation
        if (!text || !targetLanguage || !promptType) {
            return res.status(400).json({
                success: false,
                message: "text, targetLanguage and promptType are required."
            });
        }
        const response = await translateText(
            text,
            targetLanguage,
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

});

export default router;