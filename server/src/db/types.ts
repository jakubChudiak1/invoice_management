import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Files {
  file_id: Generated<number>;
  invoice_id: number;
  path: string;
}

export interface Groups {
  group_id: Generated<number>;
  name: string;
}

export interface InvoiceFolders {
  folder_id: number;
  name: string;
  root_folder: number | null;
  user_id: number;
}

export interface Invoices {
  description: string;
  folder_id: number | null;
  invoice_id: Generated<number>;
  name: string;
}

export interface Languages {
  language_id: Generated<number>;
  name: string;
}

export interface Notifications {
  description: string;
  is_read: Generated<boolean>;
  notification_id: Generated<number>;
  user_id: number;
}

export interface Users {
  email: string;
  first_name: string;
  is_verified: Generated<boolean>;
  password: string;
  surname: string;
  user_id: Generated<number>;
}

export interface UsersGroups {
  group_id: number;
  user_id: number;
  users_group_id: Generated<number>;
}

export interface UsersInvoices {
  invoice_id: number;
  user_id: number;
  user_invoice_id: Generated<number>;
}

export interface DBTypes {
  files: Files;
  groups: Groups;
  invoice_folders: InvoiceFolders;
  invoices: Invoices;
  languages: Languages;
  notifications: Notifications;
  users: Users;
  users_groups: UsersGroups;
  users_invoices: UsersInvoices;
}
