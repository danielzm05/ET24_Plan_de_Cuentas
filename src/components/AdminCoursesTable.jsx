import * as Icon from "react-feather";
import { AddStudentModal } from "./Modals/AddStudentModal";
import { DeleteCourseModal } from "./Modals/DeleteCourseModal";
import { ModifyCourseModal } from "./Modals/ModifyCourseModal";
import { useSchoolContext } from "../context/SchoolContext";
import { StudentTableModal } from "./Modals/StudentTableModal";
import { useState, useEffect } from "react";
import { Table } from "./Table";

export function AdminCoursesTable() {
  const { courses, getCourses, students, getStudents, teachers, getTeachers } = useSchoolContext();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [courseSelected, setCourseSelected] = useState(courses ? courses[0] : {});
  const [searchStudent, setSearchStudent] = useState("");
  const [openStudentTable, setOpenStudentTable] = useState(false);
  const [studentSelected, setStudentSelected] = useState({});

  useEffect(() => {
    getCourses();
    getStudents();
    getTeachers();
  }, []);

  const courseStudents = students.filter((student) => student.id_curso === courseSelected?.id_curso);
  const courseTeacher = teachers.find((teacher) => teacher.Curso.some((curso) => curso.id_curso == courseSelected?.id_curso));

  const filteredStudents = courseStudents.filter(
    (student) =>
      student.usuario.nombre.toLowerCase().includes(searchStudent.toLowerCase()) ||
      student.usuario.apellido.toLowerCase().includes(searchStudent.toLowerCase())
  );

  return (
    <>
      <Table
        title={`Curso: ${courseSelected ? courseSelected.nombre : ""}`}
        handleSearch={(e) => setSearchStudent(e.target.value)}
        add={() => setOpenAddModal(true)}
        remove={() => setOpenDeleteModal(true)}
        modify={() => setOpenModifyModal(true)}
        isAccountSelected={courseSelected}
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
        <div className="row header user">
          <span>Rol</span>
          <span>Nombre</span>
          <span>Empresa</span>
        </div>

        {courseTeacher ? (
          <div className="row user" title="Profesor">
            <Icon.Award />
            <span>{`${courseTeacher.usuario.apellido} ${courseTeacher.usuario.nombre}`}</span>
            <span>{courseTeacher.usuario.empresa}</span>
          </div>
        ) : null}

        {students &&
          filteredStudents.map((student) => (
            <div
              className={`row user`}
              key={student.id_usuario}
              onClick={() => setStudentSelected(student)}
              onDoubleClick={() => setOpenStudentTable(true)}
            >
              <span> </span>
              <span>{`${student.usuario.apellido} ${student.usuario.nombre}`}</span>
              <span>{student.usuario.empresa}</span>
            </div>
          ))}
      </Table>
      <AddStudentModal isOpen={openAddModal} onClose={() => setOpenAddModal(false)} course={courseSelected} />
      <DeleteCourseModal isOpen={openDeleteModal} onClose={() => setOpenDeleteModal(false)} course={courseSelected} />
      <ModifyCourseModal isOpen={openModifyModal} onClose={() => setOpenModifyModal(false)} course={courseSelected} teacher={courseTeacher} />
      <StudentTableModal isOpen={openStudentTable} onClose={() => setOpenStudentTable(false)} student={studentSelected} />
    </>
  );
}
