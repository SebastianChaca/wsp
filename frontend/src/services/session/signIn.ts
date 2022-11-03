import { makeRequest } from "../makeRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUser } from "./utils/setUser";
import { SessionAPIResponse } from "../../types/session/session";
interface signInProps {
  email: string;
  password: string;
}

export const signIn = (props: signInProps): Promise<SessionAPIResponse> => {
  return makeRequest<SessionAPIResponse>("/api/login", {
    data: props,
    method: "post",
  });
};
export const fetchSignIn = createAsyncThunk(
  "session/login",
  async (props: signInProps) => {
    const response = await makeRequest<SessionAPIResponse>("login", {
      data: props,
      method: "post",
    });

    setUser(response.token, response.usuario.uid);
    return response;
  }
);
