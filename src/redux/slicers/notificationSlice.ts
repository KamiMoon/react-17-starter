import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { client } from "../../api/client";
import { Notification } from "../../models/Notification";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState() as RootState);
    const [latestNotification] = allNotifications;
    const latestTimestamp = latestNotification ? latestNotification.date : "";
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    );
    return response.data;
  }
);

const notificationsAdapter = createEntityAdapter<Notification>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: notificationsAdapter.getInitialState(),
  reducers: {
    allNotificationsRead(state, action) {
      Object.values(state.entities).forEach((notification) => {
        if (notification) {
          notification.read = true;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchNotifications.fulfilled,
      (state, action: PayloadAction<Array<Notification>>) => {
        Object.values(state.entities).forEach((notification) => {
          if (notification) {
            // Any notifications we've read are no longer new
            notification.isNew = !notification.read;
          }
        });
        notificationsAdapter.upsertMany(state, action.payload);
      }
    );
  },
});

export const { allNotificationsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;

export const {
  selectAll: selectAllNotifications,
} = notificationsAdapter.getSelectors(
  (state: RootState) => state.notifications
);
