import { Modal } from "../Modal";
import { useSchoolContext } from "../../context/SchoolContext";

export function DeleteCourseModal({ isOpen, onClose, course }) {
  const { deleteCourse } = useSchoolContext();

  const handleDelete = () => {
    deleteCourse(course.id_curso);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} isClose={onClose}>
      <h3>Eliminar Curso {course?.nombre}</h3>
      <p>
        ¿Estas seguro de eliminar el curso {course?.nombre}? <br />
        Si aceptas no podrás revertir los cambios.
      </p>

      <div className="buttons-container">
        <button className="cancel-btn" onClick={() => onClose()}>
          Cancelar
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          Eliminar Curso
        </button>
      </div>
    </Modal>
  );
}
