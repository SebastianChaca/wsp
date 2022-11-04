import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getMessages } from "../../services/messages/index";
import { addFriend } from "../../services/friends";
import { ChatState, messageUI, activeChat } from "../../types/message/message";
import { friend } from "../../types/session/session";
const initialState: ChatState = {
  messages: [],
  friends: [],
  isLoading: false,
  error: null,

  activeChat: {
    name: "",
    email: null,
    online: false,
    uid: null,
    isTyping: false,
    lastActive: "",
  },
};
export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setFriendsList: (state, action: PayloadAction<friend[]>) => {
      state.friends = action.payload;
    },
    setActiveChat: (state, action: PayloadAction<activeChat>) => {
      if (state.activeChat.uid === action.payload.uid) return;
      state.activeChat = action.payload;
      state.messages = [];
    },
    setMessages: (state, action: PayloadAction<messageUI>) => {
      if (
        state.activeChat.uid === action.payload.to ||
        state.activeChat.uid === action.payload.from
      ) {
        state.messages.push(action.payload);
      } else {
        //TODO: si el mensaje no esta en active chat chequear si son amigos
        //si lo son agrego notificacion
        //si no son lo agrego a amigos con status 0 (requested)
        //primero en la lista y con notificacion
        //console.log(action.payload);
      }
    },
    setIsTyping: (state, action) => {
      if (action.payload) {
        if (
          state.activeChat.uid === action.payload.to ||
          state.activeChat.uid === action.payload.from
        ) {
          state.activeChat.isTyping = true;
        }
      } else {
        state.activeChat.isTyping = false;
      }
    },
    updateSeenMessages: (state, action) => {
      const elementsToDelete = action.payload.length;
      const arrayLength = state.messages.length;

      state.messages.splice(arrayLength - elementsToDelete, elementsToDelete);
      const newArr = state.messages.concat(action.payload);
      state.messages = newArr;
    },
    updateNotifications: (state, action: PayloadAction<messageUI>) => {
      if (action.payload.from !== state.activeChat.uid) {
        if (state.friends?.length! > 0) {
          state.friends!.forEach((friend) => {
            if (action.payload.from === friend.user.uid) {
              console.log(friend);
              return (friend.notifications += 1);
            } else {
              return friend;
            }
          });
        }
      }
    },
    resetNotifications: (
      state,
      action: PayloadAction<{ uid: string | null }>
    ) => {
      state.friends?.forEach((friend) => {
        if (action.payload.uid === friend.user.uid) {
          return (friend.notifications = 0);
        } else {
          return friend;
        }
      });
    },
    addFierndToList: (state, action) => {
      state.friends?.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getMessages.fulfilled,
        (state, action: PayloadAction<messageUI[]>) => {
          state.messages = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMessages.rejected, (state) => {
        state.error = "error";
      })
      .addCase(addFriend.fulfilled, (state, action) => {
        state.friends?.unshift(action.payload);
        state.isLoading = false;
      })
      .addCase(addFriend.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFriend.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      });
  },
});
export const {
  setFriendsList,
  setActiveChat,
  setMessages,
  setIsTyping,
  updateSeenMessages,
  addFierndToList,
  updateNotifications,
  resetNotifications,
} = chatSlice.actions;
export default chatSlice.reducer;
