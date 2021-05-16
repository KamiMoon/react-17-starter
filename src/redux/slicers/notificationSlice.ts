import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { client } from "../../api/client";
import { Notification } from "../../models/Notification";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState());
    const [latestNotification] = allNotifications;
    const latestTimestamp = latestNotification ? latestNotification.date : "";
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    );
    return response.data;
  }
);

const notificationsAdapter = createEntityAdapter<Notification>({
  sortComparer: (a: any, b: any) => b.date.localeCompare(a.date),
});

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: notificationsAdapter.getInitialState(),
  reducers: {
    allNotificationsRead(state, action) {
      // state.forEach((notification: any) => {
      //   notification.read = true;
      // });
      Object.values(state.entities).forEach((notification) => {
        if (notification) {
          notification.read = true;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action: any) => {
      // state.forEach((notification: any) => {
      //   // Any notifications we've read are no longer new
      //   notification.isNew = !notification.read;
      // });
      // state.push(...action.payload);
      // // Sort with newest first
      // state.sort((a: any, b: any) => b.date.localeCompare(a.date));
      Object.values(state.entities).forEach((notification) => {
        if (notification) {
          // Any notifications we've read are no longer new
          notification.isNew = !notification.read;
        }
      });
      notificationsAdapter.upsertMany(state, action.payload);
    });
  },
});

export const { allNotificationsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;

export const {
  selectAll: selectAllNotifications,
} = notificationsAdapter.getSelectors((state: any) => state.notifications);

//export const selectAllNotifications = (state: any) => state.notifications;
