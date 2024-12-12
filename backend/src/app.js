import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "./routes/user.route.js";

dotenv.config({
    path:"../.env"
});

const app = express();

app.use(cors({
    origin:"http://localhost:5173/",
    credentials:true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users",userRouter);

// Route setup
export { app };