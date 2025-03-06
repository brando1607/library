import { Router } from "express";
import { UsersController } from "../controller/users.controller";

export const router = Router();

router.get("/getUsers", UsersController.getUsers);

router.get("/getUser/:id", UsersController.getUser);

router.post("/createUser", UsersController.createUser);

router.put("/updateUsers/:id", UsersController.updateUser);

router.delete("/deleteUsers/:id", UsersController.deleteUser);
