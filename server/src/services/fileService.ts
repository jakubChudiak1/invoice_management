import { db } from "@src/db/db";

class FileService {
  constructor() {}

  public getInvoicesFiles = async (invoiceId: number) => {
    const files = await db
      .selectFrom("files")
      .select(["file_id", "path as file_path"])
      .where("invoice_id", "=", invoiceId)
      .execute();
    return files;
  };

  public getFileById = async (fileId: number) => {
    const file = await db
      .selectFrom("files")
      .select(["file_id", "path as file_path"])
      .where("file_id", "=", fileId)
      .executeTakeFirst();
    return file;
  };

  public createFile = async (invoiceId: number, path: string) => {
    const newFile = await db
      .insertInto("files")
      .values({ invoice_id: invoiceId, path: path })
      .executeTakeFirst();
    return newFile.insertId;
  };

  public deleteFile = async (fileId: number) => {
    const deletedFile = await db
      .deleteFrom("files")
      .where("file_id", "=", fileId)
      .executeTakeFirst();
    return deletedFile;
  };
}
export default FileService;
