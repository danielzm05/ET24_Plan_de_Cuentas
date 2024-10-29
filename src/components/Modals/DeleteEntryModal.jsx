import { Modal } from "../Modal";
import { useLedgerContext } from "../../context/LedgerContext";

export function DeleteEntryModal({ isOpen, onClose, entry }) {
  const { deleteEntry } = useLedgerContext();

  const handleDelete = () => {
    deleteEntry(entry.id_asiento);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} isClose={onClose}>
      <h3>Eliminar Asiento</h3>
      <p>
        ¿Estas seguro de eliminar este asiento contable? <br />
        Si aceptas no podrás revertir los cambios.
      </p>

      <div className="buttons-container">
        <button className="cancel-btn" onClick={() => onClose()}>
          Cancelar
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          Eliminar Asiento
        </button>
      </div>
    </Modal>
  );
}
