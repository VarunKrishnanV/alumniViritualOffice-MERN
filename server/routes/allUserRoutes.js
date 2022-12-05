import * as AllUserController from "./../controllers/AllUsersController.js";
import { Router } from "express";

const AllUserRoutes = Router();

AllUserRoutes.get("/", AllUserController.getAllUsers);
AllUserRoutes.get("/latest", AllUserController.getLatestUsers);
AllUserRoutes.get("/paavaian/:id", AllUserController.getSpecificUser);
AllUserRoutes.get("/inapproval", AllUserController.getInApprovalUsers);

export default AllUserRoutes;
