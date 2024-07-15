import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute({ isAuth, roles, children, redirectTo = "/", userRol }) {
  if (isAuth && roles.includes(userRol)) {
    return children ? children : <Outlet />;
  } else {
    return <Navigate to={redirectTo} />;
  }
}
