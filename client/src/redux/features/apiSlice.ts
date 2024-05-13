import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "invoiceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),
  tagTypes: [
    "Users",
    "UsersInvoices",
    "UsersGroups",
    "Groups",
    "Invoices",
    "InvoiceFolders",
    "Authentification",
    "Languages",
    "Notifications",
    "Files",
  ],
  endpoints: () => ({}),
});
