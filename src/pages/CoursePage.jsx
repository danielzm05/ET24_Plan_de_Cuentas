import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { NavigationMenu } from "../components/NavigationMenu";
import { useSchoolContext } from "../context/SchoolContext";
import { DeleteCourseModal } from "../components/Modals/DeleteCourseModal";
import { Button } from "../components/UI/Button";
import { Table } from "../components/Table";
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

        <Table title="Alumnos">
          <div className="table-content">
            <table>
                <thead>
                  <tr className="row header user-2">
                    <th>Estudiante</th>
                    <th>Empresa</th>
                  </tr>
                </thead>

                <tbody>
                  {courses &&
                    courses[0].curso_alumno.map((student) => (
                      <tr
                        className="row user-2"
                        key={student.usuario.id_usuario}
                      >
                        <td>
                          {student.usuario.apellido} {student.usuario.nombre}
                        </td>
                        <td>{student.usuario.empresa}</td>
                      </tr>
                    ))}
                </tbody>
            </table>
          </div>
          
        </Table>

      </main>
      <DeleteCourseModal isOpen={showModal} onClose={()=>setShowModal(false)} course={courses[0]} />
    </>
  );
}
