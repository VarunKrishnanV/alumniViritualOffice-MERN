import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
    {
        firstName: { type: String, required: ["First name is required"] },
        lastName: { type: String, required: ["Last name is required"] },
        email: { type: String, required: ["Email is required"] },
        password: { type: String, required: ["Password is required"] },
        status: { type: String, default: "in-approval" },
    },
    { timestamps: true }
);

export default new mongoose.model("UserSchema", UserSchema);
