import express, { Router } from "express";
import FileController from "@src/controller/fileController";

class FilesRoutes {
  private fileController: FileController = new FileController();
  private router: Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    this.router.get("/:invoice_id", this.fileController.getInvoicesFiles);
    this.router.get("/file/:file_id", this.fileController.getFileById);
    this.router.post("/create", this.fileController.createFile);
    this.router.delete("/delete/:file_id", this.fileController.deleteFile);
  };

  public filesRoutes = (): Router => {
    return this.router;
  };
}

export default FilesRoutes;
