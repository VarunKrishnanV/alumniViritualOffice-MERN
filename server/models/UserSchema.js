import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
    {
        fullName: { type: String, required: ["First name is required"] },
        email: { type: String, required: ["Email is required"] },
        phone: { type: String, required: ["Contact number required"] },
        identity_number: { type: String },
        college: { type: String },
        batch: { type: String },
        dept: { type: String },
        gender: { type: String },
        dob: { type: String },
        high_qualification: { type: String },
        present_organization: { type: String },
        designation: { type: String },
        current_city: { type: String },
        state: { type: String },
        country: { type: String },
        password: { type: String, required: ["Password is required"] },
        alumni_status: { type: String, default: "in-approval" },
        user_type: { type: String, default: "alumni" },
    },
    { timestamps: true }
);

export default new mongoose.model("UserSchema", UserSchema);
