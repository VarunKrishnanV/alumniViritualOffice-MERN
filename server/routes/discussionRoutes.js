import DiscussionSchema from "../models/DiscussionSchema.js";
import { Router } from "express";

// Express router
const DiscussionRoutes = Router();

// API - CREATE new discussion
DiscussionRoutes.post("/", async (req, res) => {
    const { dis_title, dis_description, dis_likes } = req.body;

    const createDiscussion = new DiscussionSchema({
        dis_title,
        dis_description,
        dis_likes,
    });

    await createDiscussion.save();
    res.json({ data: req.body });
    console.log(req.body);
});

// API - RETRIVE all discussions
DiscussionRoutes.get("/", async (req, res) => {
    const retriveDiscussions = await DiscussionSchema.find();
    res.json({ data: retriveDiscussions });
});

export default DiscussionRoutes;
