import { Modal } from "../Modal";
import { useAccounts } from "../../context/AccountContext";

export function DeleteAccountModal({ isOpen, onClose, account }) {
  const { deleteAccount } = useAccounts();

  const handleDelete = () => {
    deleteAccount(account.id_cuenta, account.nombre);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} isClose={onClose}>
      <h3>Eliminar Cuenta</h3>
      <p>
        ¿Estas seguro de eliminar esta cuenta? <br />
        Si aceptas no podrás revertir los cambios.
      </p>

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
