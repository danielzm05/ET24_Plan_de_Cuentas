import { Modal } from "../Modal";

export function ModifyAccountModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} isClose={onClose}>
      <h3>Modificar Cuenta</h3>
      <form className="form">
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" name="nombre" id="nombre" className="input-data" />
        <label htmlFor="tipo">Tipo:</label>
        <select id="tipo" name="tipo" className="input-data">
          <option value="Acreedor">Acreedor</option>
          <option value="Deudor">Deudor</option>
        </select>
        <div className="buttons-container">
          <input type="submit" value="Modificar" />
        </div>
      </form>
    </Modal>
  );
}
