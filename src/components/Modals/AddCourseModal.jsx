import { useState } from "react";
import { Modal } from "../Modal";
import { useSchoolContext } from "../../context/SchoolContext";

export function AddCourseModal({ isOpen, onClose }) {
  const { createCourse } = useSchoolContext();
  const [newCourse, setNewCourse] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCourse(newCourse.nombre);
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
          className={"input-data"}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={20}
        />
        <div className="buttons-container">
          <input type="submit" value="Crear Curso" />
        </div>
      </form>
    </Modal>
  );
}
