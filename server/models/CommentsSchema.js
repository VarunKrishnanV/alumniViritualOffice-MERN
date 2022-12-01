import mongoose, { Schema } from "mongoose";

const CommentsSchema = new Schema(
    {
        commented_by: mongoose.Types.ObjectId,
        discussion_id: mongoose.Types.ObjectId,
        comment: String,
        status: { type: String, default: "Pending" },
    },
    { timestamps: true }
);

export default new mongoose.model("CommentsSchema", CommentsSchema);
