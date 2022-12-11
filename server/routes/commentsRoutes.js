import { Router } from "express";
import * as CommentsController from "./../controllers/CommentsController.js";
// Express router
const CommentsRoutes = Router();

// API - CREATE new discussion
CommentsRoutes.post("/", CommentsController.create);

// API - RETRIVE all discussions
CommentsRoutes.get("/", CommentsController.get);
CommentsRoutes.get("/discussion/:id", CommentsController.getSpecific);
CommentsRoutes.get("/count", CommentsController.getUserCommentsCount);
CommentsRoutes.patch("/comment/status/:id", CommentsController.updateStatus);
// DiscussionRoutes.get("/", DiscussionController.get);

// db.student.find().sort({ age: 1 });
export default CommentsRoutes;
