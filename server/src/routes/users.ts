import express, { Router } from "express";
import UserController from "@src/controller/userController";
import { checkAuth } from "@src/middleware/auth";
class UsersRoutes {
  private router: Router = express.Router();
  private userController: UserController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    this.router.get("", this.userController.getUsers);
    this.router.get("/:user_id", this.userController.getUserById);
  };

  public userRoutes = (): Router => {
    return this.router;
  };
}

export default UsersRoutes;
