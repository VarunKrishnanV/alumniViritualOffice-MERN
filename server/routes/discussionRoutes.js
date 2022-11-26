import DiscussionSchema from "../models/DiscussionSchema.js";
import { Router } from "express";
import * as DiscussionController from "./../controllers/DiscussionController.js";
// Express router
const DiscussionRoutes = Router();

// API - CREATE new discussion
DiscussionRoutes.post("/", DiscussionController.create);

// API - RETRIVE all discussions
DiscussionRoutes.get("/", DiscussionController.get);

DiscussionRoutes.delete("/:id", DiscussionController.destroy);

// db.student.find().sort({ age: 1 });
export default DiscussionRoutes;
