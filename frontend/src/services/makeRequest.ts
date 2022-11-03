import axios from "axios";
// Next we make an 'instance' of it
const api = axios.create({
  // .. where we make our configurations
  baseURL: `${import.meta.env.VITE_API_URL}/api` || "",
});

export function makeRequest<T>(url: string, options?: {}): Promise<T> {
  return api(url, options)
    .then((res: any) => {
      return res.data;
    })
    .catch((error: any) => Promise.reject(error.response.data.msg));
}
