import { Modal } from "../Modal";
import "../../styles/Modal.css";

export function DeleteAccountModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} isClose={onClose}>
      <h3>Eliminar Cuenta</h3>
      <span>
        ¿Estas seguro de eliminar esta cuenta? <br />
        Si aceptas no se podrán revertir los cambios.
      </span>

      <div className="buttons-container">
        <button className="cancel-btn">Cancelar</button>
        <button className="delete-btn">Eliminar Cuenta</button>
      </div>
    </Modal>
  );
}
