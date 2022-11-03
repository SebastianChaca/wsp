import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const PrivateRoute = () => {
  const { token } = useAppSelector((state) => state.sessionSlice);

  if (!token) {
    return <Navigate to="/session/signin" replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
