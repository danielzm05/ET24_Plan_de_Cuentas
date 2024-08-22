import { useSchoolContext } from "../../context/SchoolContext";
import { useState, useEffect } from "react";
import { Modal } from "../Modal";
import { Table } from "../Table";

export function AddStudentModal({ isOpen, onClose, course }) {
  const { students, addToCourse, getStudents } = useSchoolContext();
  const [studentSelected, setStudentSelected] = useState({});
  const [searchStudent, setSearchStudent] = useState("");

  const addStudent = () => {
    addToCourse(course.id_curso, studentSelected?.id_alumno);
    setStudentSelected({});
    onClose();
  };

  useEffect(() => {
    getStudents();
  }, []);

  const filteredStudents = students.filter(
    (student) =>
      student.usuario.nombre.toLowerCase().includes(searchStudent.toLowerCase()) ||
      student.usuario.apellido.toLowerCase().includes(searchStudent.toLowerCase())
  );

  return (
    <Modal isOpen={isOpen} isClose={onClose}>
      <Table title={`Agregar alumno a ${course?.nombre}`} showOptions={false} handleSearch={(e) => setSearchStudent(e.target.value)}>
        <div className="row header student">
          <span>Alumno</span>
          <span>Curso Actual</span>
        </div>

        {students &&
          filteredStudents.map((student) => (
            <div
              className={`row student ${studentSelected.id_alumno === student.id_alumno ? "selected" : ""}`}
              key={student.id_alumno}
              onClick={() => setStudentSelected(student)}
            >
              <span>
                {student.usuario.apellido} {student.usuario.nombre}
              </span>
              <span>{student?.Curso?.nombre}</span>
            </div>
          ))}
      </Table>

      <div className="buttons-container">
        <button onClick={addStudent}>Agregar al curso</button>
      </div>
    </Modal>
  );
}
