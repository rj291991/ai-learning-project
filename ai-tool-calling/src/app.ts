import express from "express";
import router from "./routes/chatRoute.js";
const app = express()


app.use(express.json())
app.use(router);

app.listen("3000", () => {
    console.log("Application is running on port")
})