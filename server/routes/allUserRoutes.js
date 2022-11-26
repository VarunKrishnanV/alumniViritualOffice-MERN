import * as AllUserController from "./../controllers/AllUsersController.js";
import { Router } from "express";

const AllUserRoutes = Router();

AllUserRoutes.get("/", AllUserController.getAllUsers);

export default AllUserRoutes;
