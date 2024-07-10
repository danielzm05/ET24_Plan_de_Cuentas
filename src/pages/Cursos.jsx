import { useEffect, useState } from "react";
import { NavigationMenu } from "../components/NavigationMenu";
import { Table } from "../components/Table";
import { useAccounts } from "../context/AccountContext";
import { useSchoolContext } from "../context/SchoolContext";
import { StudentTableModal } from "../components/Modals/StudentTableModal";
import { ModificationTable } from "../components/ModificationsTable";

export function Cursos() {
  const { modifications, getModifications } = useAccounts();
  const { courses, getCourses, students, getStudents } = useSchoolContext();
  const [searchStudent, setSearchStudent] = useState("");
  const [openStudentTable, setOpenStudentTable] = useState(false);
  const [curseSelected, setCurseSelected] = useState(courses[0]);
  const [studentSelected, setStudentSelected] = useState({});

  useEffect(() => {
    getCourses();
    getStudents(curseSelected?.id_curso);
  }, [students]);

  useEffect(() => {
    console.log(studentSelected.id_usuario);
    getModifications(studentSelected.id_usuario);
  }, [studentSelected]);

  const handleFilterCurse = (curse) => {
    setCurseSelected(curse);
    getStudents(curse.id_curso);
  };

  const filteredStudents = students.filter(
    (student) =>
      student.nombre.toLowerCase().includes(searchStudent.toLowerCase()) ||
      student.apellido.toLowerCase().includes(searchStudent.toLowerCase())
  );

  return (
    <>
      <NavigationMenu selected="cursos" />
      <main className="cursos">
        <h2 className="page-title">Mis Cursos</h2>
        <div className="cursos-tables">
          <Table
            title={`Alumnos ${curseSelected ? curseSelected.nombre : ""}`}
            showOptions={false}
            handleSearch={(e) => setSearchStudent(e.target.value)}
          >
            <ul className="cursos-list">
              {courses &&
                courses.map((curse) => (
                  <li
                    onClick={() => handleFilterCurse(curse)}
                    key={curse.id_curso}
                    className={
                      curseSelected?.id_curso === curse.id_curso
                        ? "selected"
                        : ""
                    }
                  >
                    {curse.nombre}
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
                  className={`row modificacion ${
                    studentSelected.id === student.id_cuenta ? "selected" : ""
                  }`}
                  key={student.id_usuario}
                  onClick={() => setStudentSelected(student)}
                  onDoubleClick={() => setOpenStudentTable(true)}
                >
                  <span>{student.apellido}</span>
                  <span>{student.nombre}</span>
                  <span>{student.email}</span>
                </div>
              ))}
          </Table>

          <ModificationTable
            user={studentSelected}
            modifications={modifications}
          />
        </div>

        <StudentTableModal
          isOpen={openStudentTable}
          onClose={() => setOpenStudentTable(false)}
          student={studentSelected}
        />
      </main>
    </>
  );
}
