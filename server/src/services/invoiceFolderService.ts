import { db } from "@src/db/db";

class InvoiceFolderService {
  constructor() {}

  public getUsersFolders = async (userId: number) => {
    const usersFolders = await db
      .selectFrom("invoice_folders")
      .select([
        "folder_id",
        "user_id",
        "name as folder_name",
        "created_at",
        "root_folder",
      ])
      .where("user_id", "=", userId)
      .execute();
    return usersFolders;
  };

  public getUsersFolderById = async (userId: number, folderId: number) => {
    const usersFolder = await db
      .selectFrom("invoice_folders")
      .select([
        "folder_id",
        "user_id",
        "name as folder_name",
        "created_at",
        "root_folder",
      ])
      .where("user_id", "=", userId)
      .where("folder_id", "=", folderId)
      .executeTakeFirst();
    return usersFolder;
  };

  public createFolder = async (
    userId: number,
    name: string,
    createdAt: string,
    rootFolder: number | null
  ) => {
    const newFolder = await db
      .insertInto("invoice_folders")
      .values({
        user_id: userId,
        name: name,
        created_at: createdAt,
        root_folder: rootFolder,
      })
      .executeTakeFirst();
    return newFolder.insertId;
  };

  public changeFoldersName = async (
    userId: number,
    folderId: number,
    name: string
  ) => {
    const newFoldersName = await db
      .updateTable("invoice_folders")
      .set({ name: name })
      .where("folder_id", "=", folderId)
      .where("user_id", "=", userId)
      .executeTakeFirst();
    return newFoldersName;
  };

  public deleteFolder = async (userId: number, folderId: number) => {
    const deletedFolder = await db
      .deleteFrom("invoice_folders")
      .where("folder_id", "=", folderId)
      .where("user_id", "=", userId)
      .executeTakeFirst();
    return deletedFolder;
  };
}
export default InvoiceFolderService;
