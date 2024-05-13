import { Request, Response } from "express";
import InvoiceService from "@src/services/invoiceService";

class InvoiceController {
  private invoiceService: InvoiceService;

  constructor() {
    this.invoiceService = new InvoiceService();
  }

  public getInvoices = async (req: Request, res: Response): Promise<void> => {
    try {
      const invoices = await this.invoiceService.getInvoices();
      res.status(200).json(invoices);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public getInvoiceById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { invoice_id } = req.params;
      const invoice = await this.invoiceService.getInvoiceById(+invoice_id);
      res.status(200).json(invoice);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public getInvoiceByName = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { name } = req.query;
      if (typeof name !== "string") {
        res.status(500).json({ message: "Incorrect parameter" });
        return;
      }
      const invoice = await this.invoiceService.getInvoiceByName(name);
      res.status(200).json(invoice);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public getInvoicesByFolderId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { folder_id } = req.params;
      const invoices = await this.invoiceService.getInvoicesByFolderId(
        +folder_id
      );
      res.status(200).json(invoices);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public createInvoice = async (req: Request, res: Response): Promise<void> => {
    try {
      const { folder_id, name, description } = req.body;
      const newInvoice = await this.invoiceService.createInvoice(
        folder_id,
        name,
        description
      );
      res.status(200).json({ message: "Invoice was successfuly created!" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public deleteInvoice = async (req: Request, res: Response): Promise<void> => {
    try {
      const { invoice_id } = req.params;
      const deletedInvoice = await this.invoiceService.deleteInvoice(
        +invoice_id
      );
      res.status(200).json({ message: "Invoice was successfuly deleted!" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
export default InvoiceController;
