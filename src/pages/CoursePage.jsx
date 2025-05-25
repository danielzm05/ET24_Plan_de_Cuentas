import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { NavigationMenu } from "../components/NavigationMenu";
import { useSchoolContext } from "../context/SchoolContext";
import { DeleteCourseModal } from "../components/Modals/DeleteCourseModal";
import { Button } from "../components/UI/Button";
import * as Icon from "react-feather";
import "../styles/pages/CoursePage.css";

export function CoursePage() {
  const { courses, getCourses } = useSchoolContext();
  const { id_curso } = useParams();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getCourses(id_curso);
  }, []);

  return (
    <>
      <NavigationMenu selected="cursos" />
      <main>
        <h1>Curso: {courses[0].nombre}</h1>
        <Button className={"delete-course-btn"} onClick={() => setShowModal(true)}>
          <Icon.Trash /> Eliminar Curso
        </Button>
      </main>
      <DeleteCourseModal isOpen={showModal} onClose={()=>setShowModal(false)} course={courses[0]} />
    </>
  );
}
