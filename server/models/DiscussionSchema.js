import mongoose, { Schema } from "mongoose";

const DiscussionSchema = new Schema({
    alumni_id: mongoose.Types.ObjectId,
    dis_title: String,
    dis_description: String,
    dis_likes: Number,
    createdAt: { type: Date, default: Date.now },
    status: { type: String, default: "Pending" },
});

export default new mongoose.model("DiscussionSchema", DiscussionSchema);
