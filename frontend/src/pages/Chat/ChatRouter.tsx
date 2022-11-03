import { Route } from "react-router-dom";
import PrivateRoute from "../../routers/Routes/PrivateRoute";
import ChatPage from "./ChatPage";
const ChatRouter = (
  <>
    <Route element={<PrivateRoute />}>
      <Route path="/chat" element={<ChatPage />} />
    </Route>
  </>
);

export default ChatRouter;
