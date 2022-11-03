import { makePrivateRequest } from "../makePrivateRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { friend } from "../../types/session/session";
interface FriendApiResponse {
  ok: boolean;
  friend: friend;
}
export const addFriend = createAsyncThunk(
  "chat/addFrien",
  async (email: { email: string }) => {
    const response = await makePrivateRequest<FriendApiResponse>(
      "friends/addfriend",
      {
        data: email,
        method: "post",
      }
    );
    return response.friend;
  }
);
export const addFriendd = async (email: { email: string }) => {
  const response = await makePrivateRequest<FriendApiResponse>(
    "friends/addfriend",
    {
      data: email,
      method: "post",
    }
  );
  return response.friend;
};
