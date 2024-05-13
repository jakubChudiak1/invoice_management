import { User } from "./user";
import { File } from "./file";
import { Invoice } from "./invoice";
import { InvoiceFolder } from "./invoiceFolder";

export interface UsersInvoice extends User, File, Invoice, InvoiceFolder {
  user_invoice_id: number;
  invoice_id: number;
  user_id: number;
}
