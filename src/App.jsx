import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Cuentas } from "./pages/Cuentas";
import { TeacherCoursesPage } from "./pages/TeacherCoursesPage";
import { StudentCoursesPage } from "./pages/StudentCoursesPage";
import { TeacherCoursePage } from "./pages/TeacherCoursePage";
import { Ajustes } from "./pages/Ajustes";
import { Ledger } from "./pages/Ledger";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuthContext } from "./context/AuthContext";
import { ChangePassword } from "./pages/ChangePassword";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { ToasterContainer } from "./components/Toaster";

import "./App.css";
import { StudentCoursePage } from "./pages/StudentCoursePage";
import { SignUp } from "./pages/SignUp";

function App() {
  const { user, userInfo } = useAuthContext();

  return (
    <>
      <ToasterContainer />
      <ThemeSwitcher />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registrarse" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />

        {user && userInfo && (
          <>
            <Route element={<ProtectedRoute isAuth={user?.aud} roles={[3, 2, 1]} userRol={userInfo?.rol} />}>
              <Route path="/ajustes" element={<Ajustes />} />
              <Route path="/contraseña" element={<ChangePassword />} />
              <Route path="/cuentas" element={<Cuentas />} />
              <Route path="/libro-diario" element={<Ledger />} />
            </Route>

            <Route element={<ProtectedRoute isAuth={user?.aud} roles={[2, 1]} userRol={userInfo?.rol} />}>
              <Route path="/mis-cursos" element={<TeacherCoursesPage />} />
              <Route path="/mis-cursos/:id_curso" element={<TeacherCoursePage />}></Route>
            </Route>

            <Route element={<ProtectedRoute isAuth={user?.aud} roles={[3, 1]} userRol={userInfo?.rol} />}>
              <Route path="/cursos" element={<StudentCoursesPage />} />
              <Route path="/cursos/:id_curso" element={<StudentCoursePage />}></Route>
            </Route>
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
