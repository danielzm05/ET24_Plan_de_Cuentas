import { useState, useEffect } from "react";
import { Modal } from "../Modal";
import { useSchoolContext } from "../../context/SchoolContext";

export function AddCourseModal({ isOpen, onClose }) {
  const { courses, teachers, createCourse } = useSchoolContext();
  const [error, setError] = useState(false);
  const [newCourse, setNewCourse] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  useEffect(() => {
    if (courses.some((crse) => crse.nombre === newCourse?.nombre)) {
      setError(true);
    } else {
      setError(false);
    }
  }, [newCourse?.nombre]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createCourse(newCourse.nombre, newCourse.profesor);
    setNewCourse({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} isClose={onClose}>
      <h3>Crear Curso</h3>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre del Curso:</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          className={`input-data ${error ? "error" : ""}`}
          onChange={handleChange}
          required
          maxLength={20}
        />
        <label htmlFor="profesor">Profesor del Curso:</label>
        <select id="profesor" name="profesor" defaultValue="" className="input-data" onChange={handleChange} required>
          <option disabled value="">
            Selecciona un profesor
          </option>
          {teachers.map((teacher) => (
            <option value={teacher.id_profesor} key={teacher.id_profesor}>
              {teacher.usuario.nombre} {teacher.usuario.apellido}
            </option>
          ))}
        </select>
        <div className="buttons-container">
          {error ? <span className="error-message">⚠︎ Error: Ya existe un curso con ese nombre</span> : null}
          <input type="submit" value="Crear Curso" className={error ? "hide-btn" : ""} />
        </div>
      </form>
    </Modal>
  );
}
