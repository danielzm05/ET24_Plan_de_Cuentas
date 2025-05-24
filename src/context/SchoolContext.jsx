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
  const [courses, setCourses] = useState([]);
  const { user, userInfo } = useAuthContext();

  const createCourse = async (courseName) => {
    const { error } = await supabase.from("curso").insert([{ nombre: courseName, id_profesor: user.id }]);
    
    if (error) throw error;
    getCourses();
    toast.success(`${courseName} creado con éxito`);
  };

  const getCourses = async () => {
    const { data, error } = await supabase.from("curso").select("*").order("nombre", { ascending: true });

    if (error) throw error;
    setCourses(data);
    console.log(data);
  };

  const deleteCourse = async (id) => {
    const { error } = await supabase.from("curso").delete().eq("id_curso", id);
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
    /*     getCourses();
    getTeachers(); */
    toast.success(`Curso modificado con éxito`);
  };

  return (
    <SchoolContext.Provider
      value={{
        courses,
        getCourses,
        deleteCourse,
        updateCourse,
        createCourse,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};
