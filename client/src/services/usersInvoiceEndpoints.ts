import { apiSlice } from "../redux/features/apiSlice";
import { UsersInvoice } from "../types/userInvoice";

const UsersInvoicesApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsersInvoices: build.query<UsersInvoice[], void>({
      query: () => "/users-invoices",
      providesTags: ["UsersInvoices"],
    }),
    getUsersInvoiceById: build.query<UsersInvoice, number>({
      query: (user_invoice_id: number) => `/users-invoices/${user_invoice_id}`,
      providesTags: ["UsersInvoices"],
    }),
    createUsersInvoice: build.mutation<
      UsersInvoice,
      Omit<UsersInvoice, "user_invoice_id">
    >({
      query: (body) => ({
        url: "/users-invoices/create",
        method: "POST",
        body,
      }),
    }),
    deleteUsersInvoice: build.mutation<{ success: boolean }, number>({
      query: (user_invoice_id: number) => ({
        url: `/users-invoices/${user_invoice_id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUsersInvoicesQuery,
  useGetUsersInvoiceByIdQuery,
  useCreateUsersInvoiceMutation,
  useDeleteUsersInvoiceMutation,
} = UsersInvoicesApi;
