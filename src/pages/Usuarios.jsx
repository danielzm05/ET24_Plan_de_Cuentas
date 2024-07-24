import { NavigationMenu } from "../components/NavigationMenu";
import { Table } from "../components/Table";
import { useSchoolContext } from "../context/SchoolContext";
import * as Icon from "react-feather";
import { useState, useEffect } from "react";
import { AddStudentModal } from "../components/Modals/AddStudentModal";
import { DeleteCourseModal } from "../components/Modals/DeleteCourseModal";
import { ModifyCourseModal } from "../components/Modals/ModifyCourseModal";
import { CreateButton } from "../components/CreateButton";

export function Usuarios() {
  const { courses, getCourses, students, getStudents, users, getUsers, teachers, getTeachers } = useSchoolContext();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [courseSelected, setCourseSelected] = useState(courses ? courses[0] : {});
  const [searchStudent, setSearchStudent] = useState("");

  useEffect(() => {
    getCourses();
    getStudents();
    getTeachers();
    console.log("hola");
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
      <NavigationMenu selected="usuarios" />
      <main>
        <h2 className="page-title">Gestionar Usuarios</h2>
        <CreateButton />
        <Table
          title={`Curso: ${courseSelected ? courseSelected.nombre : ""}`}
          handleSearch={(e) => setSearchStudent(e.target.value)}
          add={() => setOpenAddModal(true)}
          remove={() => setOpenDeleteModal(true)}
          modify={() => setOpenModifyModal(true)}
          isAccountSelected={courseSelected}
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
          <div className="row header user">
            <span>Rol</span>
            <span>Apellido</span>
            <span>Email</span>
          </div>

          {courseTeacher ? (
            <div className="row user" title="Profesor">
              <Icon.Award />
              <span>
                {courseTeacher.usuario.apellido} {courseTeacher.usuario.nombre}
              </span>
              <span>{courseTeacher.usuario.email}</span>
            </div>
          ) : null}

          {students &&
            filteredStudents.map((student) => (
              <div className={`row user`} key={student.id_usuario}>
                <span> </span>
                <span>
                  {student.usuario.apellido} {student.usuario.nombre}
                </span>
                <span>{student.usuario.email}</span>
              </div>
            ))}
        </Table>
        <AddStudentModal isOpen={openAddModal} onClose={() => setOpenAddModal(false)} course={courseSelected} />
        <DeleteCourseModal isOpen={openDeleteModal} onClose={() => setOpenDeleteModal(false)} course={courseSelected} />
        <ModifyCourseModal isOpen={openModifyModal} onClose={() => setOpenModifyModal(false)} course={courseSelected} teacher={courseTeacher} />
      </main>
    </>
  );
}

/* 
<Table
          title="Usuarios"
          showOptions={true}
          add={() => setOpenAddModal(true)}
        >
          <div className="row header user">
            <span></span>
            <span>Nombre</span>
            <span>Email</span>
          </div>

          {users.map((user) => (
            <div
              className="row user"
              key={user.id_usuario}
              title={user.id_rol == 2 ? "Profesor" : "Alumno"}
            >
              <span>{user.id_rol == 2 ? <Icon.Award /> : null}</span>
              <span>
                {user.nombre} {user.apellido}
              </span>
              <span>{user.email}</span>
            </div>
          ))}
        </Table>

         */
