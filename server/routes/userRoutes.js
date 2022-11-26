// import DiscussionSchema from "../models/DiscussionSchema.js";
import { Router } from "express";
import passport from "passport";
import * as UserController from "./../controllers/UserController.js";

const UserRoutes = Router();

UserRoutes.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    UserController.get
);

export default UserRoutes;
