import express, { type Request, type Response } from "express";
import parseResume from "../services/resumeService.js";

const router = express.Router();

router.post("/resume-parser", async (req: Request, res: Response) => {

    try {

        const { resume } = req.body;

        if (!resume) {
            return res.status(400).json({
                success: false,
                message: "Resume is required."
            });
        }

        const response = await parseResume(resume);

        return res.status(200).json({
            success: true,
            data: response
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Something went wrong."
        });

    }

});

export default router;