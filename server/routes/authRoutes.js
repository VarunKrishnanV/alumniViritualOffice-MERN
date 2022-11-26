// import DiscussionSchema from "../models/DiscussionSchema.js";
import { Router } from "express";


import { register, login } from "../controllers/AuthController.js";

// Express router
const AuthRoutes = Router();

AuthRoutes.post("/signup", register);

AuthRoutes.post("/login", login);

export default AuthRoutes;
