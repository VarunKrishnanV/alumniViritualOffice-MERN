import DiscussionSchema from "../models/DiscussionSchema.js";
import { Router } from "express";
import * as DiscussionController from "./../controllers/DiscussionController.js";
// Express router
const DiscussionRoutes = Router();

// API - CREATE new discussion
DiscussionRoutes.post("/", DiscussionController.create);

// API - RETRIVE all discussions
DiscussionRoutes.get("/", DiscussionController.get);
DiscussionRoutes.get("/all", DiscussionController.getAll);
DiscussionRoutes.get("/getAllForAdmin", DiscussionController.getAllForAdmin);
DiscussionRoutes.get("/latest", DiscussionController.getLatest);
DiscussionRoutes.get("/discuss/:id", DiscussionController.getOne);
DiscussionRoutes.get("/count", DiscussionController.getUserDiscussionCount);
DiscussionRoutes.get("/inapproval", DiscussionController.getInApproval);

DiscussionRoutes.delete("/:id", DiscussionController.destroy);


// update the status of discussion
DiscussionRoutes.patch("/discuss/status/:id", DiscussionController.updateStatus);

// db.student.find().sort({ age: 1 });
export default DiscussionRoutes;
