import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Cuentas } from "./pages/Cuentas";
import { Alumnos } from "./pages/Alumnos";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuthContext } from "./context/AuthContext";
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
            <Route path="/alumnos" element={<Alumnos />} />
            <Route path="/cuentas" element={<Cuentas />} />
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;
