import ContributionsSchema from "../models/ContributionsSchema.js";
import { Router } from "express";
import * as ContributionsController from "./../controllers/ContributionsController.js";
// Express router
const ContributionsRoutes = Router();

// API - CREATE new discussion
ContributionsRoutes.post("/", ContributionsController.create);

// API - RETRIVE all discussions
ContributionsRoutes.get("/", ContributionsController.get);
ContributionsRoutes.get("/all", ContributionsController.getAll);
ContributionsRoutes.get("/contribution/:id", ContributionsController.getOne);
ContributionsRoutes.get(
    "/count",
    ContributionsController.getUserContributionsCount
);
ContributionsRoutes.get("/inapproval", ContributionsController.getInApproval);
ContributionsRoutes.get("/completed", ContributionsController.getCompleted);

ContributionsRoutes.delete("/:id", ContributionsController.destroy);

// update the status of discussion
ContributionsRoutes.patch(
    "/contribution/status/:id",
    ContributionsController.updateStatus
);

// db.student.find().sort({ age: 1 });
export default ContributionsRoutes;
