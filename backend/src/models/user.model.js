import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: [5, "User name at least must have 5 charaters."],
            trim: true,
            lowercase: true,
        },
        fullname: {
            firstname: {
                type: String,
                required: true,
                minlength: [5, "User name at least must have 5 charaters."],
                trim: true,
                lowercase: true,
            },
            lastname: {
                type: String,
                minlength: [5, "User name at least must have 5 charaters."],
                trim: true,
                lowercase: true,
            },
        },
        email: {
            type: String,
            required: true,
            minlength: [5, "User name at least must have 5 charaters."],
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        return this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.camparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "20m"
        },
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: '10d'
        }
    );
}
export const User = model("User", userSchema);