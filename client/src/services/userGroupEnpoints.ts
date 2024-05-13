import { apiSlice } from "../redux/features/apiSlice";
import { UserGroup } from "../types/userGroup";

const userGroupApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsersByGroupId: build.query<UserGroup[], number>({
      query: (group_id: number) => `/users-groups/${group_id}`,
      providesTags: ["UsersGroups"],
    }),
    addUserToGroup: build.mutation<
      UserGroup,
      Omit<UserGroup, "users_group_id"> & Pick<UserGroup, "group_id">
    >({
      query: (body) => ({
        url: `/users-groups/${body.group_id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["UsersGroups"],
    }),
    deleteUserFromGroup: build.mutation<{ success: boolean }, number>({
      query: (group_id: number) => ({
        url: `/users-groups/${group_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UsersGroups"],
    }),
  }),
});
export const {
  useAddUserToGroupMutation,
  useDeleteUserFromGroupMutation,
  useGetUsersByGroupIdQuery,
} = userGroupApi;
