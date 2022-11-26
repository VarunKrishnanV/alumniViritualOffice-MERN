import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
    {
        firstName: { type: String, required: ["First name is required"] },
        lastName: { type: String, required: ["Last name is required"] },
        email: { type: String, required: ["Email is required"] },
        phone: { type: String, required: ["Contact number required"] },
        college: { type: String },
        identity_number: { type: String },
        dept: { type: String },
        batch: { type: String },
        password: { type: String, required: ["Password is required"] },
        alumni_status: { type: String, default: "in-approval" },
        user_type: { type: String, default: "alumni" },
    },
    { timestamps: true }
);

export default new mongoose.model("UserSchema", UserSchema);
