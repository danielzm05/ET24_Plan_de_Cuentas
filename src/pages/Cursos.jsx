import { useEffect, useState } from "react";
import { NavigationMenu } from "../components/NavigationMenu";
import { Table } from "../components/Table";
import { useAccounts } from "../context/AccountContext";
import { useSchoolContext } from "../context/SchoolContext";
import { StudentTableModal } from "../components/Modals/StudentTableModal";
import { ModificationTable } from "../components/ModificationsTable";

export function Cursos() {
  const { modifications, getModifications, deleteModifications } = useAccounts();
  const { courses, getCourses, students, getStudents } = useSchoolContext();
  const [searchStudent, setSearchStudent] = useState("");
  const [openStudentTable, setOpenStudentTable] = useState(false);
  const [courseSelected, setCourseSelected] = useState(courses[0]);
  const [studentSelected, setStudentSelected] = useState({});

  useEffect(() => {
    getCourses();
    getStudents();
  }, []);

  useEffect(() => {
    getModifications(studentSelected.id_usuario);
  }, [studentSelected]);

  const deleteStudentModifications = () => {
    deleteModifications(studentSelected.id_usuario);
    getModifications(studentSelected.id_usuario);
  };

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
            <div className="row header user-2">
              <span>Estudiante</span>
              <span>Empresa</span>
            </div>

            {students &&
              filteredStudents.map((student) => (
                <div
                  className={`row user-2`}
                  key={student.id_usuario}
                  onClick={() => setStudentSelected(student)}
                  onDoubleClick={() => setOpenStudentTable(true)}
                >
                  <span>
                    {student.usuario.apellido} {student.usuario.nombre}
                  </span>
                  <span>{student.usuario.empresa}</span>
                </div>
              ))}
          </Table>

          <ModificationTable user={studentSelected} modifications={modifications} deleteAll={deleteStudentModifications} />
        </div>

        <StudentTableModal isOpen={openStudentTable} onClose={() => setOpenStudentTable(false)} student={studentSelected} />
      </main>
    </>
  );
}

function AdminCoursesTable({
  courseSelected,
  e,
  setSearchStudent,
  courses,
  course,
  setCourseSelected,
  id_curso,
  students,
  student,
  setStudentSelected,
  setOpenStudentTable,
}) {
  return (
    <Table
      title={`Alumnos ${courseSelected ? courseSelected.nombre : ""}`}
      showOptions={false}
      handleSearch={(e) => setSearchStudent(e.target.value)}
    >
      <ul className="cursos-list">
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
      <div className="row header modificacion">
        <span>Apellido</span>
        <span>Nombre</span>
        <span>Email</span>
      </div>

      {students &&
        filteredStudents.map((student) => (
          <div
            className={`row modificacion`}
            key={student.id_usuario}
            onClick={() => setStudentSelected(student)}
            onDoubleClick={() => setOpenStudentTable(true)}
          >
            <span>{student.usuario.apellido}</span>
            <span>{student.usuario.nombre}</span>
            <span>{student.usuario.email}</span>
          </div>
        ))}
    </Table>
  );
}
