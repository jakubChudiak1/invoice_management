import { apiSlice } from "../redux/features/apiSlice";
import { InvoiceFolder } from "../types/invoiceFolder";

const invoiceFolderApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsersFolders: build.query<InvoiceFolder[], void>({
      query: () => "/invoice-folders",
      providesTags: ["InvoiceFolders"],
    }),
    getUsersFolderById: build.query<InvoiceFolder[], number>({
      query: (folder_id: number) => `/invoice-folders/${folder_id}`,
      providesTags: ["InvoiceFolders"],
    }),
    createFolder: build.mutation<
      InvoiceFolder,
      Omit<InvoiceFolder, "folder_id" | "user_id">
    >({
      query: (body) => ({
        url: "/invoice-folders/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["InvoiceFolders"],
    }),
    changeFoldersName: build.mutation<
      InvoiceFolder,
      Partial<InvoiceFolder> & Pick<InvoiceFolder, "folder_id">
    >({
      query: (body) => ({
        url: `/invoice-folders/${body.folder_id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["InvoiceFolders"],
    }),
    deleteFolder: build.mutation<{ success: boolean }, number>({
      query: (folder_id: number) => ({
        url: `/invoice-folders/${folder_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["InvoiceFolders"],
    }),
  }),
});
export const {
  useChangeFoldersNameMutation,
  useCreateFolderMutation,
  useDeleteFolderMutation,
  useGetUsersFolderByIdQuery,
  useGetUsersFoldersQuery,
} = invoiceFolderApi;
