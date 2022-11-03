import { createSlice } from "@reduxjs/toolkit";
import { refreshToken } from "../../services/session/refreshToken";
import { fetchSignIn, fetchSignUp } from "../../services/session/index";
import { removeUser } from "../../services/session/utils/setUser";
import { RootState } from "../store";
import { sessionState } from "../../types/session/session";

const initialState: sessionState = {
  token: null,
  email: null,
  error: null,
  name: "",
  uid: null,
  status: "idle",
  isLoading: false,
  online: false,
  lastActive: "",
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    signOut: (state) => {
      removeUser();
      state.token = null;
      state.name = "";
      state.email = null;
      state.uid = null;
      state.status = "idle";
      state.online = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //TODO: atomizar casos ?
      //signin
      .addCase(fetchSignIn.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(fetchSignIn.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = action.payload.token;
        state.email = action.payload.usuario.email;
        state.name = action.payload.usuario.name;
        state.uid = action.payload.usuario.uid;
        state.isLoading = false;
        state.online = true;
      })
      .addCase(fetchSignIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.isLoading = false;
      })
      //signUp
      .addCase(fetchSignUp.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(fetchSignUp.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = action.payload.token;
        state.email = action.payload.usuario.email;
        state.name = action.payload.usuario.name;
        state.uid = action.payload.usuario.uid;
        state.isLoading = false;
        state.online = true;
      })
      .addCase(fetchSignUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.isLoading = false;
      })
      //refresh okten
      .addCase(refreshToken.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = action.payload.token;
        state.email = action.payload.usuario.email;
        state.name = action.payload.usuario.name;
        state.uid = action.payload.usuario.uid;
        state.isLoading = false;
        state.online = true;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});
export const { signOut } = sessionSlice.actions;
export const selectSession = (state: RootState) => state.sessionSlice;

export default sessionSlice.reducer;
