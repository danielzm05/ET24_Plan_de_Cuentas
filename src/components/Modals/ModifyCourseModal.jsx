import { useState, useEffect } from "react";
import { Modal } from "../Modal";
import { useSchoolContext } from "../../context/SchoolContext";

export function ModifyCourseModal({ isOpen, onClose, course, teacher }) {
  const [error, setError] = useState(false);
  const [courseModified, setCourseModified] = useState({});
  const { courses, teachers, updateCourse } = useSchoolContext();

  useEffect(() => {
    setCourseModified({
      nombre: course?.nombre,
      profesor: teacher?.id_profesor,
    });
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseModified({ ...courseModified, [name]: value });
  };
  useEffect(() => {
    if (courses.some((crse) => crse.nombre === courseModified.nombre && crse.nombre != course.nombre)) {
      setError(true);
    } else {
      setError(false);
    }
  }, [courseModified.nombre]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCourse(course.id_curso, courseModified.nombre, courseModified.profesor);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} isClose={onClose}>
      <h3>Modificar Curso</h3>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre del Curso:</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          className={`input-data ${error ? "error" : ""}`}
          value={courseModified.nombre}
          onChange={handleChange}
        />
        <label htmlFor="profesor">Profesor del Curso:</label>
        <select id="profesor" name="profesor" className="input-data" value={courseModified.profesor} onChange={handleChange}>
          {teachers.map((teacher) => (
            <option value={teacher.id_profesor} key={teacher.id_profesor}>
              {teacher.usuario.nombre} {teacher.usuario.apellido}
            </option>
          ))}
        </select>
        <div className="buttons-container">
          {error ? <span className="error-message">⚠︎ Error: Ya existe un curso con ese nombre</span> : null}
          <input type="submit" value="Modificar" className={error ? "hide-btn" : ""} />
        </div>
      </form>
    </Modal>
  );
}
