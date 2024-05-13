import express, { Router } from "express";
import InvoiceController from "@src/controller/invoiceController";
class InvoicesRoutes {
  private router: Router = express.Router();
  private invoiceController: InvoiceController = new InvoiceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    this.router.get("", this.invoiceController.getInvoices);
    this.router.get("/name", this.invoiceController.getInvoiceByName);
    this.router.get(
      "/folder/:folder_id",
      this.invoiceController.getInvoicesByFolderId
    );
    this.router.get("/:invoice_id", this.invoiceController.getInvoiceById);
    this.router.post("/create", this.invoiceController.createInvoice);
    this.router.delete(
      "/delete/:invoice_id",
      this.invoiceController.deleteInvoice
    );
  };

  public invoicesRoutes = (): Router => {
    return this.router;
  };
}
export default InvoicesRoutes;
