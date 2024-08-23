import { createContext, useContext } from "react";
import { useState } from "react";
import { supabase } from "../backend/client";
import { supabaseAdmin } from "../backend/client";
import toast from "react-hot-toast";
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
      const { data, error } = await supabase
        .from("usuario")
        .select("*, Rol(*)")
        .order("id_rol", { ascending: true })
        .order("nombre", { ascending: true });
      if (error) throw error;
      setUsers(data);
      console.log(data);
    }
  };

  const deleteUser = async (userId) => {
    if (!userId) return;
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (error) throw error;
    getUsers();
    getTeachers();
    getStudents();
    toast.success("Usuario eliminado con éxito");
  };

  const createStudent = async (userId) => {
    const { error } = await supabase.from("Alumno").insert([{ id_usuario: userId }]);
    getStudents();
  };

  const updateUser = async (name, lastName, rol, userId) => {
    const { error } = await supabase
      .from("usuario")
      .update({
        nombre: name,
        apellido: lastName,
        id_rol: rol,
      })
      .eq("id_usuario", userId);

    if (error) throw error;
    getUsers();
    getTeachers();
    getStudents();
    toast.success(`${name} actualizado con éxito`);
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
    toast.success(`Se agregó al alumno con éxito`);
  };

  const createCourse = async (courseName, teacherId) => {
    const { error } = await supabase.from("Curso").insert([{ nombre: courseName, id_profesor: teacherId }]);
    if (error) throw error;
    getCourses();
    getTeachers();
    toast.success(`${courseName} creado con éxito`);
  };

  const deleteCourse = async (id) => {
    const { error } = await supabase.from("Curso").delete().eq("id_curso", id);
    if (error) throw error;
    getCourses();
    toast.success(`Curso eliminado con éxito`);
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
    toast.success(`Curso modificado con éxito`);
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
        updateUser,
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
        deleteUser,
        createStudent,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};
