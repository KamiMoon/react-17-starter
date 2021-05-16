import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "api/client";

export const login = createAsyncThunk(
  "posts/login",
  async (payload: { email: string; password: string }, thunkApi) => {
    let response;
    try {
      response = await client.post("/fakeApi/login", { post: payload });
      return response.data;
    } catch (e) {
      console.log(e);
      return thunkApi.rejectWithValue(e);
    }
  }
);

interface Role {
  name: string;
  isActive: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  token: string;
  roles: Role[];
  hasRequiredPrivileges: boolean;
  status?: string;
  error?: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: "",
  roles: [],
  hasRequiredPrivileges: false,
  status: "idle",
  error: "",
};

function hasRequiredPrivileges(roles: Role[]) {
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
        console.log("removing auth state");
        localStorage.removeItem("auth");
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
        console.log("setting auth state");
        localStorage.setItem("auth", JSON.stringify(state));
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
