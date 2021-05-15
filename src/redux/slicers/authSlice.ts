import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

export const login = createAsyncThunk(
  "posts/login",
  async (payload: { email: string; password: string }) => {
    const response = await client.post("/fakeApi/login", { post: payload });
    return response;
  }
);

interface AuthState {
  isAuthenticated: boolean;
  token: string;
  roles: any[];
  hasRequiredPrivileges: boolean;
  status?: string;
  error?: any;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: "",
  roles: [],
  hasRequiredPrivileges: false,
  status: "idle",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state, action) {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "succeeded";

      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.roles = action.payload.roles;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "failed";
      console.log(action);
    });
  },
});

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions;

export default authSlice.reducer;
