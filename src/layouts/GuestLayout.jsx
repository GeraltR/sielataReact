import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../context/AuthContext";

const GuestLayout = () => {
  const { user } = useAuthContext();
  return !user ? (
    <Outlet />
  ) : user.admin === 1 ? (
    <Navigate to="/listresults" />
  ) : user.admin === 2 ? (
    <Navigate to="/jury" />
  ) : (
    <Navigate to="/" />
  );
};

export default GuestLayout;
