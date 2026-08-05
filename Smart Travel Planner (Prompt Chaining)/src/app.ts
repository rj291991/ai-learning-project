import express from "express";
// import router from "./routes/travelRoute.js";
import dotenv from "dotenv";
import travelRoute from "./routes/travelRoute.js";
dotenv.config();

const app = express()
app.use(express.json());
app.use(travelRoute)


app.listen("3000", () => {
    console.log("Server running on port 3000");
})