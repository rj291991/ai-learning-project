import express from "express";
import summarizerRoute from "./routes/summarizerRoute.js"

const app = express();
app.use(express.json());
app.use(summarizerRoute);
app.listen(3000, () => {
    console.log("Server running on port 3000");
});