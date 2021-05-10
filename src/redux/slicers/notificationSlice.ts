import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { client } from "../../api/client";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState());
    const [latestNotification] = allNotifications;
    const latestTimestamp = latestNotification ? latestNotification.date : "";
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    );
    return response.notifications;
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: [],
  reducers: {
    allNotificationsRead(state, action) {
      state.forEach((notification: any) => {
        notification.read = true;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state: any, action: any) => {
      state.forEach((notification: any) => {
        // Any notifications we've read are no longer new
        notification.isNew = !notification.read;
      });
      state.push(...action.payload);
      // Sort with newest first
      state.sort((a: any, b: any) => b.date.localeCompare(a.date));
    });
  },
});

export const { allNotificationsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;

export const selectAllNotifications = (state: any) => state.notifications;
