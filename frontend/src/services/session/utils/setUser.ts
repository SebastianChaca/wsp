export const setUser = (token: string, uid: string | null) => {
  if (token && uid) {
    localStorage.setItem("user", JSON.stringify({ token, uid }));
  }
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user && JSON.parse(user);
};

export const removeUser = () => {
  localStorage.removeItem("user");
};
