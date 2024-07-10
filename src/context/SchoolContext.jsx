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
  const [curses, setCurses] = useState([]);
  const [students, setStudents] = useState([]);
  const { user } = useAuthContext();

  const getUsers = async () => {
    const { data: systemUsers, error } = await supabase
      .from("usuario")
      .select("*");
    if (error) throw error;

    setUsers(systemUsers);
  };

  const getCurses = async () => {
    const userId = user.id;
    console.log(userId);

    const { data: cursos, error } = await supabase
      .from("Curso")
      .select("nombre, id_curso, Profesor!inner(id_profesor)")
      .eq("Profesor.id_usuario", userId);
    if (error) throw error;
    console.log(cursos);
    setCurses(cursos);
  };

  const getStudents = async (cursoId) => {
    const { data: alumnos, error } = await supabase
      .from("usuario")
      .select("id_usuario, nombre, apellido, email, Alumno!inner(id_curso)")
      .eq("Alumno.id_curso", cursoId);
    if (error) throw error;

    setStudents(alumnos);
  };

  return (
    <SchoolContext.Provider
      value={{ users, getUsers, curses, getCurses, students, getStudents }}
    >
      {children}
    </SchoolContext.Provider>
  );
};
