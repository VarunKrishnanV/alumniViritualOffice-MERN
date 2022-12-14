import mongoose, { Schema } from "mongoose";

const ContributionsSchema = new Schema(
    {
        alumni_id: mongoose.Types.ObjectId,
        cont_by: String,
        cont_type: String,
        cont_description: String,
        status: { type: String, default: "in-approval" },
    },
    { timestamps: true }
);

export default new mongoose.model("ContributionsSchema", ContributionsSchema);
