import { makeRequest } from "../makeRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUser } from "./utils/setUser";
import { SessionAPIResponse } from "../../types/session/session";
interface signUpProps {
  name: string;
  email: string;
  password: string;
}

export const signUp = (props: signUpProps): Promise<SessionAPIResponse> => {
  return makeRequest<SessionAPIResponse>("/api/login/new", {
    data: props,
    method: "post",
  });
};
export const fetchSignUp = createAsyncThunk(
  "session/signUp",
  async (props: signUpProps) => {
    const response = await makeRequest<SessionAPIResponse>("/login/new", {
      data: props,
      method: "post",
    });
    setUser(response.token, response.usuario.uid);
    return response;
  }
);
