import { apiSlice } from "../redux/features/apiSlice";
import { User } from "../types/user";

const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsersData: build.query<Omit<User, "password">, void>({
      query: () => "/auth/user-data",
      providesTags: ["Authentification"],
    }),
    signUp: build.mutation<User, Omit<User, "user_id" | "full_name">>({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Authentification"],
    }),
    signIn: build.mutation<
      User,
      Omit<User, "user_id" | "full_name" | "surname" | "first_name">
    >({
      query: (body) => ({
        url: "/auth/signin",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Authentification"],
    }),
    signOut: build.mutation<{ success: boolean }, void>({
      query: () => ({
        url: "/auth/signout",
        method: "POST",
      }),
      invalidatesTags: ["Authentification"],
    }),
    verifyUser: build.mutation<User, Partial<User> & Pick<User, "user_id">>({
      query: (body) => ({
        url: "/auth/verify-user",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Authentification"],
    }),
  }),
});
export const {
  useGetUsersDataQuery,
  useSignInMutation,
  useSignOutMutation,
  useSignUpMutation,
  useVerifyUserMutation,
} = authApi;
