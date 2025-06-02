import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { NavigationMenu } from "../components/NavigationMenu";
import { useSchoolContext } from "../context/SchoolContext";
import * as Icon from "react-feather";
import "../styles/pages/CoursePage.css";

export function StudentCoursePage() {
  const { courses, getStudentCourses } = useSchoolContext();
  const { id_curso } = useParams();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getStudentCourses(id_curso);
  }, []);

  return (
    <>
      <NavigationMenu selected="cursos" />

      <main>
        <div className="course-header">
          <h1>Curso: {courses[0]?.curso.nombre}</h1>
          <p>Prof.</p>
        </div>
      </main>
    </>
  );
}
