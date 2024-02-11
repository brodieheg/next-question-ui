import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const isServer = typeof window === "undefined";

// Async action creators using createAsyncThunk
export const signup = createAsyncThunk(
  "/signup",
  async (formProps, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/signup`, formProps);

      !isServer && localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async (formProps, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/signin`, formProps);
      !isServer && localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    const token = window.localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    try {
      const response = await axios.get(`${BASE_URL}/auth/current_user`, config);
      return { response: response.data, token };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authenticated: "",
    errorMessage: "",
    email: null,
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
    signout: (state) => {
      !isServer && localStorage.removeItem("token");
      state.authenticated = "";
      state.email = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.authenticated = action.payload.token;
        state.email = action.payload.email || null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.errorMessage = action.payload;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.authenticated = action.payload.token;
        state.email = action.payload.email || null;
      })
      .addCase(signin.rejected, (state, action) => {
        state.errorMessage = action.payload;
      });
    // .addCase(fetchUser.fulfilled, (state, action) => {
    //   state.authenticated = action.payload.token;
    //   state.email = action.payload.email || null;
    // });
  },
});

export const { signout, setAuthenticated } = authSlice.actions;

export default authSlice.reducer;
