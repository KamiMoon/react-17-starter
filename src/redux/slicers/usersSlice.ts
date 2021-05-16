import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { User } from "../../models/User";

const usersAdapter = createEntityAdapter<User>();

const initialState = usersAdapter.getInitialState();

//const initialState: any[] = [];

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await client.get("/fakeApi/users");
  return response as Array<User>;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(fetchUsers.fulfilled, (state, action) => {
    //   return action.payload;
    // });

    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll);
  },
});

export default usersSlice.reducer;

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors((state: any) => state.users);

// export const selectAllUsers = (state: any) => state.users;

// export const selectUserById = (state: any, userId: any) =>
//   state.users.find((user: any) => user.id === userId);
