import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
interface initialStateType {
  socket: Socket | undefined | null;
  online: boolean;
}

const initialState: initialStateType = {
  socket: null,
  online: false,
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    getUserStatus: (state, action: PayloadAction<boolean>) => {
      state.online = action.payload;
    },
    //cuando agrego el type socket se rompe porque redux agrega le agrega un type draft
    connectSocket: (state, action: PayloadAction<any>) => {
      state.socket = action.payload;
    },
  },
});
export const { connectSocket, getUserStatus } = socketSlice.actions;
export default socketSlice.reducer;
