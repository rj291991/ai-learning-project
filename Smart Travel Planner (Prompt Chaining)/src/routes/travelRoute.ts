import express, { type Request, type Response } from "express";
import { generateTravelPlan } from "../services/travelService.js";

const router = express.Router();


router.post("/travel-plan", async (req: Request, res: Response) => {

    try {

        const { destination, days } = req.body;


        // Validation
        if (
            !destination ||
            !days ||
            Number(days) <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Valid destination and days are required."
            });
        }


        const travelPlan = await generateTravelPlan(
            destination,
            Number(days)
        );


        return res.status(200).json({
            success: true,
            data: travelPlan
        });


    } catch (error) {

        console.error(
            "Travel Plan Error:",
            error
        );


        return res.status(500).json({
            success: false,
            message: "Failed to generate travel plan."
        });
    }

});


export default router;