import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Cuentas } from "./pages/Cuentas";
import { Cursos } from "./pages/Cursos";
import { Usuarios } from "./pages/Usuarios";
import { Ajustes } from "./pages/Ajustes";
import { Ledger } from "./pages/Ledger";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuthContext } from "./context/AuthContext";
import { ChangePassword } from "./pages/ChangePassword";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { ToasterContainer } from "./components/Toaster";
import "./App.css";

function App() {
  const { user, userInfo } = useAuthContext();

  return (
    <>
      <ToasterContainer />
      <ThemeSwitcher />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<ProtectedRoute isAuth={user?.aud} roles={[3, 2, 1]} userRol={userInfo?.id_rol} />}>
          <Route path="/ajustes" element={<Ajustes />} />
          <Route path="/contraseña" element={<ChangePassword />} />
        </Route>

        <Route element={<ProtectedRoute isAuth={user?.aud} roles={[3, 2, 1]} userRol={userInfo?.id_rol} />}>
          <Route path="/cuentas" element={<Cuentas />} />
          <Route path="/libro-diario" element={<Ledger />} />
        </Route>
        <Route element={<ProtectedRoute isAuth={user?.aud} roles={[2, 1]} userRol={userInfo?.id_rol} />}>
          <Route path="/cursos" element={<Cursos />} />
        </Route>

        <Route element={<ProtectedRoute isAuth={user?.aud} roles={[1]} userRol={userInfo?.id_rol} />}>
          <Route path="/usuarios" element={<Usuarios />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
