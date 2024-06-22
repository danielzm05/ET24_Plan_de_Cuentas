import { Modal } from "../Modal";
import { useAccounts } from "../../context/AccountContext";

export function DeleteAccountModal({ isOpen, onClose, accountSelected }) {
  const { deleteAccount } = useAccounts();

  const handleDelete = () => {
    deleteAccount(accountSelected);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} isClose={onClose}>
      <h3>Eliminar Cuenta</h3>
      <span>
        ¿Estas seguro de eliminar esta cuenta? <br />
        Si aceptas no podrás revertir los cambios.
      </span>

      <div className="buttons-container">
        <button className="cancel-btn" onClick={() => onClose()}>
          Cancelar
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          Eliminar Cuenta
        </button>
      </div>
    </Modal>
  );
}
