import { Modal } from "../Modal";
import { useSchoolContext } from "../../context/SchoolContext";

export function DeleteUserModal({ isOpen, onClose, user, userId }) {
  const { deleteUser } = useSchoolContext();

  const handleDelete = () => {
    deleteUser(user.id_usuario);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} isClose={onClose}>
      <h3>
        Eliminar a {user?.nombre} {user?.apellido}
      </h3>
      <p>
        ¿Estas seguro de eliminar a {user?.nombre} {user?.apellido}? <br />
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
