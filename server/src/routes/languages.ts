import express, { Router } from "express";
import LanguageController from "@src/controller/languageController";

class LanguagesRoutes {
  private router: Router = express.Router();
  private languageController: LanguageController = new LanguageController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    this.router.get("", this.languageController.getLanguages);
  };

  public languageRoutes = (): Router => {
    return this.router;
  };
}
export default LanguagesRoutes;
