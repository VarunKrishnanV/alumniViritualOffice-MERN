import mongoose, { Schema } from "mongoose";

const CommentsSchema = new Schema(
    {
        commented_by: mongoose.Types.ObjectId,
        discussion_id: mongoose.Types.ObjectId,
        commented_by_name: String,
        comment: String,
        status: { type: String, default: "in-approval" },
    },
    { timestamps: true }
);

export default new mongoose.model("CommentsSchema", CommentsSchema);
