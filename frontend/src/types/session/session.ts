export interface user {
  email: string | null;
  name: string;
  uid: string | null;
  online: boolean;
  lastActive: string;
}

export interface SessionAPIResponse {
  ok: boolean;
  token: string;
  usuario: user;
}
//redux
export interface sessionState extends user {
  token: string | null;
  error: string | null | undefined;
  status: "idle" | "loading" | "failed";
  isLoading: boolean;
}

export interface friend {
  user: user;
  notifications: number;
  status: number;
  _id: string;
}

export interface friendsAPIResponse {
  ok: boolean;
  friends: friend[];
}
