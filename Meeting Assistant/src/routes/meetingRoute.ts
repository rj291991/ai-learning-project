import express from "express";
import meetingAssistant from "../services/meetingService.js";

const router = express.Router();

router.post("/meeting-assistant", async (req, res) => {

    try {

        const { transcript } = req.body;

        if (!transcript) {
            return res.status(400).json({
                success: false,
                message: "Transcript is required."
            });
        }

        const response = await meetingAssistant(transcript);

        return res.status(200).json({
            success: true,
            data: response
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