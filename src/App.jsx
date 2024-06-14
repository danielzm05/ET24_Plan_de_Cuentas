import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Cuentas } from "./pages/Cuentas";
import { Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cuentas" element={<Cuentas />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
