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
  const [teachers, setTeachers] = useState([]);
  const { user, userInfo } = useAuthContext();

  const getUsers = async () => {
    const { data: systemUsers, error } = await supabase.from("usuario").select("*");
    if (error) throw error;

    setUsers(systemUsers);
  };

  const getCourses = async () => {
    if (userInfo.id_rol === 1) {
      const { data: allCourses, error } = await supabase.from("Curso").select("*");
      if (error) throw error;
      setCourses(allCourses);
    } else {
      const { data: courses, error } = await supabase
        .from("Curso")
        .select("nombre, id_curso, Profesor!inner(id_profesor)")
        .eq("Profesor.id_usuario", user.id);
      if (error) throw error;
      setCourses(courses);
    }
  };

  const addToCourse = async (courseId, studentId) => {
    const { data, error } = await supabase.from("Alumno").update({ id_curso: courseId }).eq("id_alumno", studentId);
    if (error) throw error;
    getStudents();
  };

  const getTeachers = async () => {
    const { data: teachers, error } = await supabase.from("Profesor").select(`*,usuario (*), Curso(id_curso)`);
    if (error) throw error;

    setTeachers(teachers);
  };

  const getStudents = async () => {
    const { data: alumnos, error } = await supabase.from("Alumno").select("*, usuario (*), Curso(nombre)");

    if (error) throw error;
    setStudents(alumnos);
  };

  return (
    <SchoolContext.Provider value={{ users, getUsers, courses, getCourses, students, getStudents, teachers, getTeachers, addToCourse }}>
      {children}
    </SchoolContext.Provider>
  );
};
