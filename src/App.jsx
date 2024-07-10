import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Cuentas } from "./pages/Cuentas";
import { Cursos } from "./pages/Cursos";
import { Usuarios } from "./pages/Usuarios";
import { Ajustes } from "./pages/Ajustes";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuthContext } from "./context/AuthContext";
import { ChangePassword } from "./pages/ChangePassword";
import "./App.css";

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        {user && (
          <Route element={<ProtectedRoute isAuth={user} />}>
            <Route path="/cursos" element={<Cursos />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/cuentas" element={<Cuentas />} />
            <Route path="/ajustes" element={<Ajustes />} />
            {/* <Route path="/contraseña" element={<ChangePassword />} /> */}
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;
