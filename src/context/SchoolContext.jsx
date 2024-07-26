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
    if (userInfo.id_rol === 1) {
      const { data, error } = await supabase.from("usuario").select("*").order("id_rol", { ascending: true }).order("nombre", { ascending: true });
      if (error) throw error;
      setUsers(data);
    }
  };

  const getCourses = async () => {
    if (userInfo.id_rol === 1) {
      const { data: allCourses, error } = await supabase.from("Curso").select("*").order("nombre", { ascending: true });
      if (error) throw error;
      setCourses(allCourses);
    } else {
      const { data: courses, error } = await supabase
        .from("Curso")
        .select("nombre, id_curso, Profesor!inner(id_profesor)")
        .eq("Profesor.id_usuario", user.id)
        .order("nombre", { ascending: true });
      if (error) throw error;
      setCourses(courses);
    }
  };

  const addToCourse = async (courseId, studentId) => {
    const { error } = await supabase.from("Alumno").update({ id_curso: courseId }).eq("id_alumno", studentId);
    if (error) throw error;
    getStudents();
  };

  const createCourse = async (courseName, teacherId) => {
    const { error } = await supabase.from("Curso").insert([{ nombre: courseName, id_profesor: teacherId }]);
    if (error) throw error;
    getCourses();
    getTeachers();
  };

  const deleteCourse = async (id) => {
    const { error } = await supabase.from("Curso").delete().eq("id_curso", id);
    if (error) throw error;
    getCourses();
  };

  const updateCourse = async (courseId, courseName, teacherId) => {
    const { error } = await supabase
      .from("Curso")
      .update({
        nombre: courseName,
        id_profesor: teacherId,
      })
      .eq("id_curso", courseId);

    if (error) throw error;
    getCourses();
    getTeachers();
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
    <SchoolContext.Provider
      value={{
        users,
        getUsers,
        courses,
        getCourses,
        students,
        getStudents,
        teachers,
        getTeachers,
        addToCourse,
        deleteCourse,
        updateCourse,
        createCourse,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};
