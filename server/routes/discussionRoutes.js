import DiscussionSchema from "../models/DiscussionSchema.js";
import { Router } from "express";
import passport from "passport";

// Express router
const DiscussionRoutes = Router();

// API - CREATE new discussion
DiscussionRoutes.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const { dis_title, dis_description, dis_likes } = req.body;

        const createDiscussion = new DiscussionSchema({
            dis_title,
            dis_description,
            dis_likes,
        });

        await createDiscussion.save();
        res.json({ data: req.body });
        console.log(req.body);
    }
);

// API - RETRIVE all discussions
DiscussionRoutes.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const retriveDiscussions = await DiscussionSchema.find().sort({
            createdAt: -1,
        });
        res.json({ data: retriveDiscussions });
    }
);

DiscussionRoutes.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const deleteDiscussion = await DiscussionSchema.findOneAndDelete({
            id: req.params._id,
        });
        res.json(`Deleted Successfully. ${deleteDiscussion}`);
    }
);

// db.student.find().sort({ age: 1 });
export default DiscussionRoutes;
