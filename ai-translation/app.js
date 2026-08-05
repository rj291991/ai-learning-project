import express from "express";
import translatorRoute from "./routes/translatorRoute.js"

const app = express();
app.use(express.json());
app.use(translatorRoute);
app.listen(3000, () => {
    console.log("Server running on port 3000");
});