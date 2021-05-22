import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { client } from "api/client";
import { User } from "models/User";
import type { RootState } from "redux/store";

const DOMAIN = process.env.REACT_APP_API_DOMAIN;

const usersAdapter = createEntityAdapter<User>();

const initialState = usersAdapter.getInitialState();

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await client.get(`${DOMAIN}/users`);
  return response.data as Array<User>;
});

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (payload: { id: string }) => {
    const response = await client.get(`${DOMAIN}/user/${payload.id}`);
    return response.data as User;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll);
    builder.addCase(fetchUser.fulfilled, usersAdapter.upsertOne);
  },
});

export default usersSlice.reducer;

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors((state: RootState) => state.users);
