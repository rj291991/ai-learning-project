import express from "express";
import dotenv from "dotenv";

import resumeRoute from "./routes/resumeRoute.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(resumeRoute);

app.listen(3000, () => {

    console.log("🚀 Server running on port 3000");

});