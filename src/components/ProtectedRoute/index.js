import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserDetailsContext from "../../context/UserDetailsContext";

const ProtectedRoute = () => {
  const value = useContext(UserDetailsContext);
  const { isLoggedIn } = value;
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
export default ProtectedRoute;
