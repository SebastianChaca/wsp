import { makePrivateRequest } from "../makePrivateRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUser } from "./utils/setUser";
import { SessionAPIResponse } from "../../types/session/session";

export const refreshToken = createAsyncThunk("session/refresh", async () => {
  const response = await makePrivateRequest<SessionAPIResponse>(
    `/login/refresh`
  );
  setUser(response.token, response.usuario.uid);
  return response;
});
