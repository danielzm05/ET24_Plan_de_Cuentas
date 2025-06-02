import { useEffect, useState } from "react";
import { NavigationMenu } from "../components/NavigationMenu";
import { useSchoolContext } from "../context/SchoolContext";
import { AddCourseModal } from "../components/Modals/AddCourseModal";
import { CourseCard } from "../components/UI/CourseCard";
import { Button } from "../components/UI/Button";
import * as Icon from "react-feather";
import "../styles/pages/CoursesPage.css";

export function TeacherCoursesPage() {
  const { courses, getTeacherCourses } = useSchoolContext();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getTeacherCourses();
  }, []);

  return (
    <>
      <NavigationMenu selected="cursos" />
      <main className="cursos">
        <h2 className="page-title">Mis Cursos</h2>
        <Button className="add-course-btn" onClick={() => setShowModal(true)}>
          <Icon.Plus /> Crear Curso
        </Button>
        <div className="courses-container">
          {courses?.length > 0
            ? courses.map((course) => <CourseCard key={course.id_curso} id={course.id_curso} name={course.nombre} className="course-card" />)
            : <p>Crea tu primer curso para comenzar.</p>}
        </div>
      </main>
      <AddCourseModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
