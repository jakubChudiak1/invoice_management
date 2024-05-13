import { apiSlice } from "../redux/features/apiSlice";
import { Notification } from "../types/notification";

const notificationApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsersNotifications: build.query<Notification[], void>({
      query: () => "/notifications",
      providesTags: ["Notifications"],
    }),
    getUsersNotificationById: build.query<Notification, number>({
      query: (notifiation_id: number) => `/notifications/${notifiation_id}`,
      providesTags: ["Notifications"],
    }),
    createNotification: build.mutation<
      Notification,
      Omit<Notification, "notification_id">
    >({
      query: (body) => ({
        url: "/notifications/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Notifications"],
    }),
    setNotificationStatus: build.mutation<
      Notification,
      Partial<Notification> & Pick<Notification, "notification_id">
    >({
      query: (body) => ({
        url: "/notifications/set-status",
        method: "PATCH",
        body,
      }),
    }),
  }),
});
export const {
  useCreateNotificationMutation,
  useGetUsersNotificationByIdQuery,
  useGetUsersNotificationsQuery,
  useSetNotificationStatusMutation,
} = notificationApi;
