import { Modal } from "../Modal";
import { useEffect, useState } from "react";
import { useAccounts } from "../../context/AccountContext";

export function AddAccountModal({ isOpen, onClose }) {
  const [error, setError] = useState(false);
  const [accountInfo, setAccountInfo] = useState({
    codigo: "",
    nombre: "",
    tipo: "Acreedor",
  });

  const { accounts, createAccount } = useAccounts();

  useEffect(() => {
    accounts.some((account) => account.codigo == accountInfo.codigo)
      ? setError(true)
      : setError(false);
  }, [accountInfo]);

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    setAccountInfo({
      ...accountInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createAccount(accountInfo.codigo, accountInfo.nombre, accountInfo.tipo);
    setAccountInfo({
      codigo: "",
      nombre: "",
      tipo: "Acreedor",
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} isClose={onClose}>
      <h3>Nueva Cuenta</h3>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="codigo">Código:</label>
        <input
          type="number"
          name="codigo"
          id="codigo"
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
