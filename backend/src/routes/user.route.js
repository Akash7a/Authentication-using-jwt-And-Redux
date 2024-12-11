import express from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/logout",verifyJWT,logoutUser);
userRouter.get("/refresh-token",refreshAccessToken);

export {
    userRouter
};