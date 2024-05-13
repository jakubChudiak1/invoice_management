import { apiSlice } from "../redux/features/apiSlice";
import { File } from "../types/file";

const fileApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getInvoicesFiles: build.query<File[], number>({
      query: (invoice_id: number) => `/files/${invoice_id}`,
      providesTags: ["Files"],
    }),
    getFileById: build.query<File, number>({
      query: (file_id: number) => `/files/file/${file_id}`,
      providesTags: ["Files"],
    }),
    createFile: build.mutation<File, Omit<File, "file_id">>({
      query: (body) => ({
        url: "/files/create",
        method: "POST",
        body,
      }),
    }),
    deleteFile: build.mutation<{ success: boolean }, number>({
      query: (file_id: number) => ({
        url: `/files/delete/${file_id}`,
        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useCreateFileMutation,
  useDeleteFileMutation,
  useGetFileByIdQuery,
  useGetInvoicesFilesQuery,
} = fileApi;
