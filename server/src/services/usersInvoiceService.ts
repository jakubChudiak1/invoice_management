import { db } from "@src/db/db";
import { sql } from "kysely";
class UsersInvoiceService {
  constructor() {}

  public getUsersInvoices = async (userId: number) => {
    const usersInvoices = await db
      .selectFrom("users_invoices as ui")
      .leftJoin("users as u", "u.user_id", "ui.user_id")
      .leftJoin("invoices as i", "i.invoice_id", "ui.invoice_id")
      .leftJoin("files as f", "i.invoice_id", "f.invoice_id")
      .select([
        "ui.user_invoice_id",
        "u.user_id",
        "i.invoice_id",
        "i.name as invoice_name",
        "i.description",
        "f.path as file_path",
      ])
      .where("ui.user_id", "=", userId)
      .execute();
    return usersInvoices;
  };

  public getUsersInoviceById = async (userInvoiceId: number) => {
    const usersInvoice = await db
      .selectFrom("users_invoices as ui")
      .leftJoin("users as u", "u.user_id", "ui.user_id")
      .leftJoin("invoices as i", "i.invoice_id", "ui.invoice_id")
      .leftJoin("files as f", "i.invoice_id", "f.invoice_id")
      .select([
        "ui.user_invoice_id",
        "u.user_id",
        "i.invoice_id",
        "i.name as invoice_name",
        "i.description",
        "f.path as file_path",
      ])
      .where("ui.user_invoice_id", "=", userInvoiceId)
      .executeTakeFirst();
    return usersInvoice;
  };

  public createUsersInvoice = async (invoiceId: number, userId: number) => {
    const newUsersInvoice = await db
      .insertInto("users_invoices")
      .values({ user_id: userId, invoice_id: invoiceId })
      .executeTakeFirst();
    return newUsersInvoice.insertId;
  };

  public deleteUsersInvoice = async (userInvoiceId: number) => {
    const deletedInvoice = await db
      .deleteFrom("users_invoices")
      .where("user_invoice_id", "=", userInvoiceId)
      .executeTakeFirst();
    return deletedInvoice;
  };
}
export default UsersInvoiceService;
