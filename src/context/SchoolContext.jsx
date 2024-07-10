import { createContext, useContext } from "react";
import { useState } from "react";
import { supabase } from "../backend/client";
import { useAuthContext } from "./AuthContext";

export const SchoolContext = createContext();

export const useSchoolContext = () => {
  const context = useContext(SchoolContext);
  return context;
};
export const SchoolProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const { user } = useAuthContext();

  const getUsers = async () => {
    const { data: systemUsers, error } = await supabase
      .from("usuario")
      .select("*");
    if (error) throw error;

    setUsers(systemUsers);
  };

  const getCourses = async () => {
    const userId = user.id;

    const { data: cursos, error } = await supabase
      .from("Curso")
      .select("nombre, id_curso, Profesor!inner(id_profesor)")
      .eq("Profesor.id_usuario", userId);
    if (error) throw error;
    setCourses(cursos);
  };

  const getStudents = async (cursoId) => {
    if (!cursoId) return;
    const { data: alumnos, error } = await supabase
      .from("usuario")
      .select("id_usuario, nombre, apellido, email, Alumno!inner(id_curso)")
      .eq("Alumno.id_curso", cursoId);
    if (error) throw error;

    setStudents(alumnos);
  };

  return (
    <SchoolContext.Provider
      value={{ users, getUsers, courses, getCourses, students, getStudents }}
    >
      {children}
    </SchoolContext.Provider>
  );
};
