import express, { Router } from "express";
import UsersInvoiceController from "@src/controller/usersInvoiceController";

class UsersInvoicesRoutes {
  private usersInvoiceController: UsersInvoiceController =
    new UsersInvoiceController();
  private router: Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    this.router.get("", this.usersInvoiceController.getUsersInvoices);
    this.router.get(
      "/:user_invoice_id",
      this.usersInvoiceController.getUsersInvoiceById
    );
    this.router.post("/create", this.usersInvoiceController.createUsersInvoice);
    this.router.delete(
      "/delete/:user_invoice_id",
      this.usersInvoiceController.deleteUsersInvoice
    );
  };

  public userInvoicesRoutes = (): Router => {
    return this.router;
  };
}
export default UsersInvoicesRoutes;
