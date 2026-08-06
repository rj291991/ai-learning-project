import express from "express";
import dotenv from "dotenv";

import meetingRoute from "./routes/meetingRoute.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(meetingRoute);

app.listen(3000, () => {

    console.log("🚀 Server running on port 3000");

});