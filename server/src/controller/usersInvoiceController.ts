import { Request, Response } from "express";
import UsersInvoiceService from "@src/services/usersInvoiceService";

class UsersInvoiceController {
  private usersInvoiceService: UsersInvoiceService;

  constructor() {
    this.usersInvoiceService = new UsersInvoiceService();
  }

  public getUsersInvoices = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      if (req.session?.user_id !== undefined) {
        const usersInvoices = await this.usersInvoiceService.getUsersInvoices(
          req.session.user_id
        );
        res.status(200).json(usersInvoices);
      } else {
        res.status(400).json({ message: "Unathorized!" });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public getUsersInvoiceById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { user_invoice_id } = req.params;
      const usersInvoice = await this.usersInvoiceService.getUsersInoviceById(
        +user_invoice_id
      );
      res.status(200).json(usersInvoice);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public createUsersInvoice = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { invoice_id } = req.body;
      if (req.session.user_id !== undefined) {
        const newUsersInvoice =
          await this.usersInvoiceService.createUsersInvoice(
            invoice_id,
            req.session.user_id
          );
        res
          .status(200)
          .json({ message: "Users invoice was successfuly created!" });
      } else {
        res.status(400).json({ message: "Unathorized!" });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public deleteUsersInvoice = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { user_invoice_id } = req.params;
      const deletedInvoice = await this.usersInvoiceService.deleteUsersInvoice(
        +user_invoice_id
      );
      res.status(200).json({ message: "Users invoice successfuly deleted!" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
export default UsersInvoiceController;
