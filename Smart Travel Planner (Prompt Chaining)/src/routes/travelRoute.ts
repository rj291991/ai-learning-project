import express, { type Request, type Response } from "express";
import generateTravelPlan from "../services/travelService.js";

const router = express.Router()

router.post("/travel-plan", async (req: Request, res: Response) => {

    try {
        const { destination, days } = req.body;

        if (!destination || !days) {
            return res.status(400).json({
                success: false,
                message: "destination and days are required."
            });
        }

        const response = await generateTravelPlan(
            destination,
            Number(days)
        );

        return res.status(200).json({
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

export default router;