import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

export const login = createAsyncThunk(
  "posts/login",
  async (payload: { email: string; password: string }, thunkApi) => {
    let response;
    try {
      response = await client.post("/fakeApi/login", { post: payload });
      console.log(response);

      return response;
    } catch (e) {
      console.log(e);
      return thunkApi.rejectWithValue(e);
    }
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

function hasRequiredPrivileges(
  roles: Array<{ name: string; isActive: boolean }>
) {
  if (roles) {
    const foundRoles = roles.filter((f) => {
      return f.name === "Admin" && f.isActive === true;
    });

    if (foundRoles && foundRoles.length) {
      return true;
    }
  }
  return false;
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout() {
      try {
        sessionStorage.removeItem("auth");
      } catch (e) {
        console.log(e);
      }

      return {
        ...initialState,
      };
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
      state.hasRequiredPrivileges = hasRequiredPrivileges(action.payload.roles);

      try {
        sessionStorage.setItem("auth", JSON.stringify(state));
      } catch (e) {
        console.log(e);
      }
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
