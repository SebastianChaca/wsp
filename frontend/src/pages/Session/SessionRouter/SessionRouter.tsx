import { Route } from "react-router-dom";
import PublicRoute from "../../../routers/Routes/PublicRoute";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp.";
const SessionRouter = (
  <Route path="/session" element={<PublicRoute />}>
    <Route path="signin" element={<SignIn />} />
    <Route path="signup" element={<SignUp />} />
  </Route>
);

export default SessionRouter;
