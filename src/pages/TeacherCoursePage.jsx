import { useEffect, useState } from "react";
import { NavigationMenu } from "../components/NavigationMenu";
import { useSchoolContext } from "../context/SchoolContext";
import { DeleteCourseModal } from "../components/Modals/DeleteCourseModal";
import { Button } from "../components/UI/Button";
import { Table } from "../components/Table";
import * as Icon from "react-feather";
import "../styles/pages/CoursePage.css";
import { useParams, Link } from "react-router-dom";

export function TeacherCoursePage() {
  const { courses, getTeacherCourses, deleteCourseStudent } = useSchoolContext();
  const { id_curso } = useParams();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getTeacherCourses(id_curso);
  }, []);

  const deleteStudent = async (id_student) => {
    deleteCourseStudent(id_student, id_curso);
  };

  return (
    <>
      <NavigationMenu selected="mis-cursos" />

      <main>
        <div className="course-header">
          <h1>Curso: {courses[0]?.nombre}</h1>
          <p>
            Código de Ingreso: <span className="course-code">{courses[0]?.codigo}</span>
          </p>
        </div>

        <Button className={"delete-course-btn"} onClick={() => setShowModal(true)}>
          <Icon.Trash /> Eliminar Curso
        </Button>

        <Table title="Alumnos">
          <div className="table-content">
            <table>
              <thead>
                <tr className="row header user-2">
                  <th>Estudiante</th>
                  <th>Empresa</th>
                  <th>Ver</th>
                  <th onClick={deleteStudent}>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {courses &&
                  courses[0]?.curso_alumno?.map((student) => (
                    <tr className="row user-2" key={student.usuario?.id_usuario}>
                      <td>
                        {student.usuario?.apellido} {student.usuario?.nombre}
                      </td>
                      <td>{student.usuario?.empresa}</td>
                      <td>
                        <Link to={`/estudiante/${student.usuario?.id_usuario}`} replace={true}>
                          <Icon.Eye />
                        </Link>
                      </td>
                      <td>
                        <Button onClick={() => deleteStudent(student.usuario?.id_usuario)}>
                          <Icon.Trash />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Table>
      </main>
      <DeleteCourseModal isOpen={showModal} onClose={() => setShowModal(false)} course={courses[0]} />
    </>
  );
}
