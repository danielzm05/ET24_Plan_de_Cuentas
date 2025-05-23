import { Navigate, Outlet } from "react-router";

export function ProtectedRoute({ isAuth, roles = [], children, redirectTo = "/", userRol = [] }) {
  const hasRole = roles.some((role) => userRol.includes(role));

  if (isAuth && hasRole) {
    return children ? children : <Outlet />;
  } else {
    return <Navigate to={redirectTo} />;
  }
}
