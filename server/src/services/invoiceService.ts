import { db } from "@src/db/db";

class InvoiceService {
  constructor() {}

  public getInvoices = async () => {
    const invoices = await db
      .selectFrom("invoices")
      .select([
        "invoice_id",
        "folder_id",
        "description as invoice_description",
        "name as invoice_name",
      ])
      .execute();
    return invoices;
  };

  public getInvoiceById = async (invoiceId: number) => {
    const invoice = await db
      .selectFrom("invoices")
      .select([
        "invoice_id",
        "folder_id",
        "description as invoice_description",
        "name as invoice_name",
      ])
      .where("invoice_id", "=", invoiceId)
      .executeTakeFirst();
    return invoice;
  };

  public getInvoiceByName = async (name: string) => {
    const invoice = await db
      .selectFrom("invoices")
      .select([
        "invoice_id",
        "folder_id",
        "description as invoice_description",
        "name as invoice_name",
      ])
      .where("name", "=", name)
      .executeTakeFirst();
    return invoice;
  };

  public getInvoicesByFolderId = async (folderId: number) => {
    const invoices = await db
      .selectFrom("invoices")
      .select([
        "invoice_id",
        "folder_id",
        "description as invoice_description",
        "name as invoice_name",
      ])
      .where("folder_id", "=", folderId)
      .execute();
    return invoices;
  };

  public createInvoice = async (
    folderId: number | null,
    name: string,
    description: string
  ) => {
    const newInvoice = await db
      .insertInto("invoices")
      .values({ folder_id: folderId, name: name, description: description })
      .executeTakeFirst();
    return newInvoice.insertId;
  };

  public deleteInvoice = async (invoiceId: number) => {
    const deletedInvoice = await db
      .deleteFrom("invoices")
      .where("invoice_id", "=", invoiceId)
      .executeTakeFirst();
    return deletedInvoice;
  };
}
export default InvoiceService;
