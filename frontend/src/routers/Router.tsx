import { Routes, Route, Navigate } from "react-router-dom";
import ChatRouter from "../pages/Chat/ChatRouter";
import SessionRouter from "../pages/Session/SessionRouter/SessionRouter";

const Router = () => {
  //TODO: mejor forma de implementar ?
  return (
    <Routes>
      {SessionRouter}
      {ChatRouter}
      <Route path="*" element={<Navigate to="/session/signin" replace />} />
    </Routes>
  );
};

export default Router;
