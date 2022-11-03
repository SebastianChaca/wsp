import { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routers/Router";
import { theme } from "./chakra/theme";
import { useAppDispatch } from "./redux/hooks";
import { refreshToken } from "./services/session/refreshToken";
import { getUser } from "./services/session/utils/setUser";
export const App = () => {
  const dispatch = useAppDispatch();

  const user = getUser();
  const token = user?.token;

  useEffect(() => {
    if (token) {
      dispatch(refreshToken());
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ChakraProvider>
  );
};
