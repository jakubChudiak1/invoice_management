import { apiSlice } from "../redux/features/apiSlice";
import { User } from "../types/user";

const userApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    getUserById: build.query<User, number>({
      query: (user_id) => `/users/${user_id}`,
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery } = userApi;
