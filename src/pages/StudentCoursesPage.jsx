import { useEffect, useState } from "react";
import { JoinCourseModal } from "../components/Modals/JoinCourseModal";
import { NavigationMenu } from "../components/NavigationMenu";
import { useSchoolContext } from "../context/SchoolContext";
import { CourseCard } from "../components/UI/CourseCard";
import { Button } from "../components/UI/Button";
import * as Icon from "react-feather";
import "../styles/pages/CoursesPage.css";

export function StudentCoursesPage() {
  const { courses, getStudentCourses } = useSchoolContext();
  const [showModal, setShowModal] = useState(false);
  const [showModalJoin, setShowModalJoin] = useState(false);
  useEffect(() => {
    getStudentCourses();
  }, []);

  return (
    <>
      <NavigationMenu selected="cursos" />
      <main className="cursos">
        <h2 className="page-title">Mis Cursos</h2>
        <Button className="add-course-btn" onClick={() => setShowModalJoin(true)}>
          <Icon.Users /> Unirme
        </Button>
        <div className="courses-container">
          {courses?.length > 0 ? (
            courses.map((course) => (
              <CourseCard key={course.id_curso} id={course.id_curso} link={"cursos"} name={course.curso?.nombre} className="course-card" />
            ))
          ) : (
            <p>No te has unido a ningún curso</p>
          )}
        </div>
      </main>
      <JoinCourseModal isOpen={showModalJoin} onClose={() => setShowModalJoin(false)} />
    </>
  );
}
