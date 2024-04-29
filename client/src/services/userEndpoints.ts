import { apiSlice } from "../redux/features/apiSlice";
import { User } from "../types/user";
const userApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getPes: build.query<User, void>({
      query: () => "pes",
      providesTags: ["Pes"],
    }),
  }),
});

export const { useGetPesQuery } = userApi;
