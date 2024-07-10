import { useEffect, useState } from "react";
import { NavigationMenu } from "../components/NavigationMenu";
import { Table } from "../components/Table";
import { useAccounts } from "../context/AccountContext";
import { useSchoolContext } from "../context/SchoolContext";
import { StudentTableModal } from "../components/Modals/StudentTableModal";

export function Alumnos() {
  const { modifications, getModifications } = useAccounts();
  const { curses, getCurses, students, getStudents } = useSchoolContext();
  const [searchModification, setSearchModification] = useState("");
  const [searchStudent, setSearchStudent] = useState("");
  const [openStudentTable, setOpenStudentTable] = useState(false);
  const [curseSelected, setCurseSelected] = useState(curses ? curses[0] : {});
  const [studentSelected, setStudentSelected] = useState({});

  useEffect(() => {
    getModifications();
    getCurses();
  }, [students]);

  const handleStudentSelected = (student) => {
    setStudentSelected(student);
    setOpenStudentTable(true);
    console.log(student);
  };

  const handleFilterCurse = (curse) => {
    setCurseSelected(curse);
    getStudents(curse.id_curso);
  };

  const handleFilterModification = (e) => {
    setSearchModification(e.target.value);
  };

  const handleFilterStudent = (e) => {
    setSearchStudent(e.target.value);
  };

  const filteredModifications = modifications.filter((mod) =>
    mod.descripcion.toLowerCase().includes(searchModification.toLowerCase())
  );

  const filteredStudents = students.filter(
    (student) =>
      student.nombre.toLowerCase().includes(searchStudent.toLowerCase()) ||
      student.apellido.toLowerCase().includes(searchStudent.toLowerCase())
  );

  return (
    <>
      <NavigationMenu selected="alumnos" />
      <main>
        <Table
          title={`Alumnos ${curseSelected ? curseSelected.nombre : ""}`}
          showOptions={false}
          handleSearch={handleFilterStudent}
        >
          <ul className="cursos-list">
            {curses &&
              curses.map((curse) => (
                <li
                  onClick={() => handleFilterCurse(curse)}
                  key={curse.id_curso}
                  className={
                    curseSelected?.id_curso === curse.id_curso
                      ? "selected"
                      : null
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
                className="row modificacion"
                key={student.id_usuario}
                onClick={() => handleStudentSelected(student)}
              >
                <span>{student.apellido}</span>
                <span>{student.nombre}</span>
                <span>{student.email}</span>
              </div>
            ))}
        </Table>

        <Table
          title="Modificaciones de cuentas"
          showOptions={false}
          handleSearch={handleFilterModification}
        >
          <div className="row header modificacion">
            <span>Hora</span>
            <span>Descripción</span>
            <span>Fecha</span>
          </div>

          {filteredModifications.map((mod) => (
            <div className="row modificacion" key={mod.id_modificacion}>
              <span>{mod.fecha.slice(11, 16)}</span>
              <span>{mod.descripcion}</span>
              <span>{mod.fecha.slice(0, 10)}</span>
            </div>
          ))}
        </Table>

        <StudentTableModal
          isOpen={openStudentTable}
          onClose={() => setOpenStudentTable(false)}
          student={studentSelected}
        />
      </main>
    </>
  );
}
