import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SignUp, LogIn } from "../api/api";
import { googleLogout } from "@react-oauth/google";

export const getCurrOrder = createAsyncThunk("getCurrOrder", async (id) => {
  const { data } = await getOrder(id);
  return data;
});

export const signUp = createAsyncThunk("signUp", async (formData) => {
  const response = await SignUp(formData);
  return { data: response.data, status: response.status };
});

export const signIn = createAsyncThunk("signIn", async (formData) => {
  const response = await LogIn(formData);
  return { data: response.data, status: response.status };
});

const initialState = {
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      const profile = localStorage.getItem("profile");
      if (profile?.length > 500) {
        googleLogout();
      }
      localStorage.clear();
      state.isAuthenticated = false;
      state.user = null;
    },
    googleLogin: (state, action) => {
      const { result, token } = action.payload;
      state.user = {
        imageUrl: result.picture,
        name: result.name,
        userId: result.sub,
        email: result.email,
      };
      localStorage.setItem("access_token", token);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      const result = action.payload.data;
      state.user = {
        name: result.name,
        userId: result.id,
        email: result.email,
        privateKey: result.privateKey,
        publicKey: result.publicKey,
      };
      state.isAuthenticated = true;
      localStorage.setItem("access_token", result.token);
      localStorage.setItem("user", JSON.stringify({ ...state.user }));
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      const result = action.payload.data;
      state.user = {
        name: result.name,
        userId: result.id,
        email: result.email,
        privateKey: result.privateKey,
        publicKey: result.publicKey,
      };
      state.isAuthenticated = true;
      localStorage.setItem("access_token", result.token);
      localStorage.setItem("user", JSON.stringify({ ...state.user }));
    });
  },
});

export const { logout, googleLogin, googleLogOut } = authSlice.actions;
export default authSlice.reducer;
