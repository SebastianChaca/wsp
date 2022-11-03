import { user, friend } from "../../types/session/session";

export interface message {
  to: string | null;
  from: string | null;
  message: string;
}

export interface messageUI extends message {
  seen: boolean;
  date: string;
  id: string;
}

export interface messageToServer extends message {
  isTyping?: boolean;
}

export interface activeChat extends user {
  isTyping: boolean;
}
export interface ChatState {
  messages: messageUI[];
  friends: friend[] | null;
  activeChat: activeChat;
  isLoading: boolean;
  error: string | null;
}

export interface serverMessageResponse extends message {
  updatedAt: string;
  createdAt: string;
  _id: string;
  seen: boolean;
}
