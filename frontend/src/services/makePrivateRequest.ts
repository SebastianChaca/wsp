import { makeRequest } from "./makeRequest";
import { getUser } from "./session/utils/setUser";

export function makePrivateRequest<T>(url: string, options?: {}) {
  const token = getUser().token;
  return makeRequest<T>(url, {
    ...options,
    headers: {
      "x-token": token,
    },
  });
}
