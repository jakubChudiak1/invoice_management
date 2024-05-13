import express, { Router } from "express";
import InvoiceFolderController from "@src/controller/invoiceFolderController";

class InvoiceFoldersRoutes {
  private router: Router = express.Router();
  private invoiceFolderController: InvoiceFolderController =
    new InvoiceFolderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    this.router.get("", this.invoiceFolderController.getUsersFolders);
    this.router.get(
      "/:folder_id",
      this.invoiceFolderController.getUsersFolderById
    );
    this.router.post("/create", this.invoiceFolderController.createFolder);

    this.router.patch(
      "/change-name/:folter_id",
      this.invoiceFolderController.changeFoldersName
    );
    this.router.delete(
      "/delete/:folder_id",
      this.invoiceFolderController.deleteFolder
    );
  };

  public invoiceFoldersRoutes = (): Router => {
    return this.router;
  };
}
export default InvoiceFoldersRoutes;
