import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute({ isAuth, children, redirectTo = "/" }) {
  console.log(isAuth);
  if (!isAuth) {
    return <Navigate to={redirectTo} />;
  }
  return children ? children : <Outlet />;
}
