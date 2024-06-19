import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Cuentas } from "./pages/Cuentas";
import { Alumnos } from "./pages/Alumnos";
import { Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/alumnos" element={<Alumnos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Cuentas />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
