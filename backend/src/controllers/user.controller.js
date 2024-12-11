import { createNewUser } from "../service/user.service.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = user.generateAccessToken(userId);
        const newrefreshToken = user.generateRefreshToken(userId);

        user.refreshToken = newrefreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, newrefreshToken };
    } catch (error) {
        console.error(`Internal Server Error::${error}`);
        throw new Error("Error generating tokens.");
    }
};

const options = {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
};


const registerUser = async (req, res) => {
    try {
        const { username, fullname, email, password } = req.body;

        console.log(req.body)
        if (!(username, fullname, email, password)) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const user = await createNewUser(
            {
                username,
                fullname: {
                    firstname: fullname.firstname,
                    lastname: fullname.lastname,
                },
                email,
                password,
            }
        );

        res.status(201).json({
            message: "User registered successfully!",
            user,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;

        if (!emailOrUsername || !password) {
            return res.status(400).json({ message: "Username/Email and Password are required." });
        }

        const user = await User.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid Username/Email or Password." });
        }

        const validatePassword = await user.camparePassword(password);

        if (!validatePassword) {
            return res.status(400).json({ message: "Invalid Username/Email or Password." });
        }

        const { accessToken, newrefreshToken } = await generateAccessAndRefreshToken(user._id);

        const loggedInUser = await User.findById(user._id).select("-refreshToken -password");

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newrefreshToken, options)
            .json({
                message: "User Logged in successfully.",
                user: loggedInUser,
                accessToken,
                newrefreshToken,
            });
    } catch (error) {
        res.status(400).json({ message: "Internal Server Error", error });
    }

};;

const logoutUser = async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined,
            }
        },
        {
            new: true,
        }
    );
    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({
            message: "User logged out successfully."
        });
}

const refreshAccessToken = async (req, res) => {
    try {

        const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;


        if (!refreshToken) {
            return res.status(401).json({ message: "Unauthorized: No refresh token provided." });
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decoded._id);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Forbidden: Invalid refresh token." });
        }


        const { accessToken, newrefreshToken } = await generateAccessAndRefreshToken(user._id);

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newrefreshToken, options)
            .json({
                message: "Access token refreshed successfully.",
                accessToken,
                newrefreshToken,
            });

    } catch (error) {
        console.error("Error refreshing access token:", error.message);
        return res.status(500).json({ message: "Internal Server Error." });
    }
}

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
};