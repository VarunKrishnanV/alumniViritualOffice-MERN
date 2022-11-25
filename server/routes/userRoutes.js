// import DiscussionSchema from "../models/DiscussionSchema.js";
import { Router } from "express";
import passport from "passport";

const UserRoutes = Router();

UserRoutes.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        res.json({ user: req.user });
    }
);

export default UserRoutes;
