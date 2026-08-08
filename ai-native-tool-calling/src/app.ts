import express from "express";
import chatRoute from "./routes/chatRoute.js";

const app = express();

app.use(express.json());

app.use(chatRoute);

app.listen(3000, () => {
    console.log("Application is running on port 3000");
});