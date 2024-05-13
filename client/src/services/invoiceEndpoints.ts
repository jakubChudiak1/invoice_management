import { apiSlice } from "../redux/features/apiSlice";
import { Invoice } from "../types/invoice";

const invoiceApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getInvoices: build.query<Invoice[], void>({
      query: () => "/invoices",
      providesTags: ["Invoices"],
    }),
    getInvoiceByName: build.query<Invoice, string>({
      query: (name: string) => `/invoices/name?${name}`,
      providesTags: ["Invoices"],
    }),
    getInvoicesByFolderId: build.query<Invoice[], number>({
      query: (folder_id: number) => `/invoices/folder/${folder_id}`,
      providesTags: ["Invoices"],
    }),
    getInvoiceById: build.query<Invoice, number>({
      query: (invoice_id: number) => `/invoices/${invoice_id}`,
      providesTags: ["Invoices"],
    }),
    createInvoice: build.mutation<Invoice, Omit<Invoice, "invoice_id">>({
      query: (body) => ({
        url: "/invoices/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Invoices"],
    }),
    deleteInvoice: build.mutation<{ success: boolean }, number>({
      query: (invoice_id: number) => ({
        url: `/invoices/delete/${invoice_id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateInvoiceMutation,
  useDeleteInvoiceMutation,
  useGetInvoiceByIdQuery,
  useGetInvoiceByNameQuery,
  useGetInvoicesByFolderIdQuery,
  useGetInvoicesQuery,
} = invoiceApi;
