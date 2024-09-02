import { useEffect, useState } from "react";
import { NavigationMenu } from "../components/NavigationMenu";
import { Table } from "../components/Table";
import { useSchoolContext } from "../context/SchoolContext";
import { StudentTableModal } from "../components/Modals/StudentTableModal";
import { ModificationTable } from "../components/ModificationsTable";

export function Cursos() {
  const { courses, getCourses, students, getStudents } = useSchoolContext();
  const [searchStudent, setSearchStudent] = useState("");
  const [openStudentTable, setOpenStudentTable] = useState(false);
  const [courseSelected, setCourseSelected] = useState(courses[0]);
  const [studentSelected, setStudentSelected] = useState({});

  useEffect(() => {
    getCourses();
    getStudents();
  }, []);

  const courseStudents = students.filter((student) => student.id_curso === courseSelected?.id_curso);

  const filteredStudents = courseStudents.filter(
    (student) =>
      student.usuario.nombre.toLowerCase().includes(searchStudent.toLowerCase()) ||
      student.usuario.apellido.toLowerCase().includes(searchStudent.toLowerCase())
  );

  return (
    <>
      <NavigationMenu selected="cursos" />
      <main className="cursos">
        <h2 className="page-title">Mis Cursos</h2>
        <div className="cursos-tables">
          <Table
            title={`Alumnos ${courseSelected ? courseSelected.nombre : ""}`}
            showOptions={false}
            handleSearch={(e) => setSearchStudent(e.target.value)}
          >
            <ul className="table-list">
              {courses &&
                courses.map((course) => (
                  <li
                    onClick={() => setCourseSelected(course)}
                    key={course.id_curso}
                    className={courseSelected?.id_curso === course.id_curso ? "selected" : ""}
                  >
                    {course.nombre}
                  </li>
                ))}
            </ul>
            <table>
              <thead>
                <tr className="row header user-2">
                  <th>Estudiante</th>
                  <th>Empresa</th>
                </tr>
              </thead>

              <tbody>
                {students &&
                  filteredStudents.map((student) => (
                    <tr
                      className={`row user-2 ${studentSelected.id_usuario === student.id_usuario ? "selected" : ""}`}
                      key={student.id_usuario}
                      onClick={() => setStudentSelected(student)}
                      onDoubleClick={() => setOpenStudentTable(true)}
                    >
                      <td>
                        {student.usuario.apellido} {student.usuario.nombre}
                      </td>
                      <td>{student.usuario.empresa}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Table>

          <ModificationTable user={studentSelected} />
        </div>

        <StudentTableModal isOpen={openStudentTable} onClose={() => setOpenStudentTable(false)} student={studentSelected} />
      </main>
    </>
  );
}
