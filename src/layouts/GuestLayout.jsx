import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../context/AuthContext";

const GuestLayout = () => {
  const { user, initializing } = useAuthContext();
  if (initializing) return null;
  return !user ? <Outlet /> : <Navigate to="/" />;
};

export default GuestLayout;
