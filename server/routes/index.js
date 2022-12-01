import { Router } from "express";
import DiscussionRoutes from "./discussionRoutes.js";
import AuthRoutes from "./authRoutes.js";
import UserRoutes from "./userRoutes.js";
import passport from "passport";
import AllUserRoutes from "./allUserRoutes.js";
import CommentsRoutes from "./CommentsRoutes.js";

const router = Router();

router.use(
    "/discussion",
    passport.authenticate("jwt", { session: false }),
    DiscussionRoutes
);
router.use(
    "/allusers",
    passport.authenticate("jwt", { session: false }),
    AllUserRoutes
);
router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);
router.use(
    "/comments",
    passport.authenticate("jwt", { session: false }),
    CommentsRoutes
);

export default router;
