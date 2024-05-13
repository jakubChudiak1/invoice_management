import { apiSlice } from "../redux/features/apiSlice";
import { Group } from "../types/group";

const groupApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getGroups: build.query<Group[], void>({
      query: () => "/groups",
      providesTags: ["Groups"],
    }),
    getGroupById: build.query<Group, number>({
      query: (group_id: number) => `/groups/${group_id}`,
      providesTags: ["Groups"],
    }),
    getGroupByName: build.query<Group, string>({
      query: (name: string) => `/groups/name/${name}`,
      providesTags: ["Groups"],
    }),
    createGroup: build.mutation<Group, Omit<Group, "group_id">>({
      query: (body) => ({
        url: "/groups/create-group",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Groups"],
    }),
    updateGroup: build.mutation<
      Group,
      Partial<Group> & Pick<Group, "group_id">
    >({
      query: (body) => ({
        url: `/groups/${body.group_id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Groups"],
    }),
    deleteGroup: build.mutation<{ success: boolean }, number>({
      query: (group_id: number) => ({
        url: `/groups/delete-group/${group_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Groups"],
    }),
  }),
});
export const {
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useGetGroupByIdQuery,
  useGetGroupByNameQuery,
  useGetGroupsQuery,
} = groupApi;
