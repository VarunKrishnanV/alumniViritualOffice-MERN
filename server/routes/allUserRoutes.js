import * as AllUserController from "./../controllers/AllUsersController.js";
import { Router } from "express";

const AllUserRoutes = Router();

AllUserRoutes.get("/", AllUserController.getAllUsers);
AllUserRoutes.get("/latest", AllUserController.getLatestUsers);

export default AllUserRoutes;
