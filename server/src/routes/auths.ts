import express, { Router } from "express";
import AuthController from "@src/controller/auhController";

class AuthsRoutes {
  private router: Router = express.Router();
  private authController: AuthController;

  constructor() {
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    this.router.get("/user-data", this.authController.getUsersData);
    this.router.post("/signup", this.authController.signUp);
    this.router.post("/signin", this.authController.signIn);
    this.router.post("/signout", this.authController.signOut);
    this.router.patch("/verify-user", this.authController.verifyUser);
  };

  public authsRoutes = (): Router => {
    return this.router;
  };
}

export default AuthsRoutes;
