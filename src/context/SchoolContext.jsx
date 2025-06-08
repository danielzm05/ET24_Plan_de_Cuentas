import { createContext, useContext } from "react";
import { useState } from "react";
import { supabase } from "../backend/client";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthContext } from "./AuthContext";

export const SchoolContext = createContext();

export const useSchoolContext = () => {
  const context = useContext(SchoolContext);
  return context;
};
export const SchoolProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const generateCourseCode = () => {
    return Math.random().toString().substring(2, 8);
  };

  const joinCourse = async (courseCode) => {
    const { data, error } = await supabase.from("curso").select("id_curso").eq("codigo", courseCode).single();

    if (error) {
      toast.error("Código de curso inválido");
      throw error;
    }

    const { error: joinError } = await supabase.from("curso_alumno").insert([{ id_curso: data.id_curso, id_usuario: user.id }]);

    if (joinError) {
      toast.error("No se pudo unirse al curso");
      throw joinError;
    }

    getStudentCourses();
    navigate(`/cursos/${data.id_curso}`);
    toast.success("Te has unido al curso con éxito");
  };

  const createCourse = async (courseName) => {
    const { error } = await supabase.from("curso").insert([{ nombre: courseName, id_profesor: user.id, codigo: generateCourseCode() }]);

    if (error) throw error;
    getTeacherCourses();
    toast.success(`${courseName} creado con éxito`);
  };

  const getStudentCourses = async (id) => {
    let query = supabase.from("curso_alumno").select("*, curso(*)").eq("id_usuario", user.id).order("id_curso", { ascending: true });

    if (id) {
      query = query.eq("id_curso", id);
    }

    const { data, error } = await query;
    if (error) throw error;
    setCourses(data);
  };

  const deleteCourseStudent = async (id_student, id_course) => {
    const { error } = await supabase.from("curso_alumno").delete().eq("id_usuario", id_student).eq("id_curso", id_course);
    if (error) throw error;
    getTeacherCourses();
    toast.success(`Estudiante eliminado del curso con éxito`);
  };

  const getTeacherCourses = async (id) => {
    let query = supabase.from("curso").select("*, curso_alumno(*, usuario(*))").order("id_curso", { ascending: true }).eq("id_profesor", user.id);

    if (id) {
      query = query.eq("id_curso", id);
    }

    const { data, error } = await query;
    if (error) throw error;
    setCourses(data);
  };

  const deleteCourse = async (id) => {
    const { error } = await supabase.from("curso").delete().eq("id_curso", id);
    if (error) throw error;

    navigate("/mis-cursos");
    getTeacherCourses();
    toast.success(`Curso eliminado con éxito`);
  };

  return (
    <SchoolContext.Provider
      value={{
        courses,
        getTeacherCourses,
        getStudentCourses,
        deleteCourse,
        createCourse,
        joinCourse,
        deleteCourseStudent,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};
