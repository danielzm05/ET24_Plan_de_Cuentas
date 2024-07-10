import { useEffect, useState } from "react";
import { NavigationMenu } from "../components/NavigationMenu";
import { Table } from "../components/Table";
import { useAccounts } from "../context/AccountContext";
import { useSchoolContext } from "../context/SchoolContext";

export function Alumnos() {
  const { accounts, modifications, getModifications } = useAccounts();
  const { curses, getCurses, students, getStudents } = useSchoolContext();
  const [curseSelected, setCurseSelected] = useState(curses ? curses[0] : {});

  useEffect(() => {
    getModifications();
    getCurses();
  }, [accounts]);

  const handleFilter = (curse) => {
    setCurseSelected(curse);
    getStudents(curse.id_curso);
  };

  return (
    <>
      <NavigationMenu selected="alumnos" />
      <main>
        <Table title={`Alumnos ${curseSelected?.nombre}`} showOptions={false}>
          <ul className="cursos-list">
            {curses &&
              curses.map((curse) => (
                <li
                  onClick={() => handleFilter(curse)}
                  key={curse.id_curso}
                  className={
                    curseSelected.id_curso === curse.id_curso
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
            students.map((student) => (
              <div className="row modificacion" key={student.id_usuario}>
                <span>{student.apellido}</span>
                <span>{student.nombre}</span>
                <span>{student.email}</span>
              </div>
            ))}
        </Table>

        <Table title="Modificaciones de cuentas">
          <div className="row header modificacion">
            <span>Hora</span>
            <span>Descripción</span>
            <span>Fecha</span>
          </div>

          {modifications.map((mod) => (
            <div className="row modificacion" key={mod.id_modificacion}>
              <span>{mod.fecha.slice(11, 16)}</span>
              <span>{mod.descripcion}</span>
              <span>{mod.fecha.slice(0, 10)}</span>
            </div>
          ))}
        </Table>
      </main>
    </>
  );
}
