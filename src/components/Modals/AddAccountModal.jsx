import { Modal } from "../Modal";
import { useState } from "react";
import { useAccounts } from "../../context/AccountContext";

export function AddAccountModal({ isOpen, onClose }) {
  const [error, setError] = useState(false);
  const [accountInfo, setAccountInfo] = useState({
    id: "",
    nombre: "",
    tipo: "Acreedor",
  });

  const { accounts, createAccount } = useAccounts();

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    setAccountInfo({
      ...accountInfo,
      [name]: value,
    });

    accounts.some((account) => account.id_cuenta == accountInfo.id)
      ? setError(true)
      : setError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createAccount(accountInfo.id, accountInfo.nombre, accountInfo.tipo);
    setAccountInfo({
      id: "",
      nombre: "",
      tipo: "Acreedor",
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} isClose={onClose}>
      <h3>Nueva Cuenta</h3>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="id">Código:</label>
        <input
          type="number"
          name="id"
          id="id"
          className={`input-data ${error ? "error" : ""}`}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          className="input-data"
          onChange={handleInputChange}
          required
        />
        <label htmlFor="tipo">Tipo:</label>
        <select
          id="tipo"
          name="tipo"
          className="input-data"
          onChange={handleInputChange}
          defaultValue={accountInfo.tipo}
        >
          <option value="Acreedor" defaultValue>
            Acreedor
          </option>
          <option value="Deudor">Deudor</option>
        </select>
        <div className="buttons-container">
          <span className="error-message">
            {error ? "⚠︎ Error: Código ya existente" : ""}
          </span>
          <input
            type="submit"
            value="Crear Cuenta"
            className={error ? "hide-btn" : ""}
          />
        </div>
      </form>
    </Modal>
  );
}
