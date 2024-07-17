import { useState, useEffect } from "react";
import { Modal } from "../Modal";
import { useAccounts } from "../../context/AccountContext";

export function ModifyAccountModal({ isOpen, onClose, account }) {
  const [error, setError] = useState(false);
  const [accountModified, setAccountModified] = useState({});

  const { accounts, updateAccount } = useAccounts();

  useEffect(() => {
    setAccountModified({
      id: account.id,
      codigo: account.codigo,
      nombre: account.nombre,
      tipo: account.tipo,
    });
  }, [account]);

  useEffect(() => {
    if (accounts.some((acct) => acct.codigo == accountModified.codigo && accountModified.codigo != account.codigo)) {
      setError(true);
    } else {
      setError(false);
    }
  }, [accountModified.codigo]);

  const formatCode = (value) => {
    const cleanedValue = value.replace(/\D/g, ""); // Elimina caracteres no numéricos
    const parts = cleanedValue.match(/.{1,2}/g); // Divide en grupos de 2 dígitos
    const formatted = parts ? parts.join(".") : ""; // Junta con puntos
    return formatted.substring(0, 14); // Limita a 14 caracteres
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "codigo") {
      const formattedValue = formatCode(value);
      setAccountModified({
        ...accountModified,
        [name]: formattedValue,
      });
    } else {
      setAccountModified({
        ...accountModified,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAccount(accountModified.id, accountModified.codigo, accountModified.nombre, accountModified.tipo, account);

    onClose();
  };

  return (
    <Modal isOpen={isOpen} isClose={onClose}>
      <h3>Modificar Cuenta</h3>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="codigo">Código:</label>
        <input
          type="text"
          name="codigo"
          id="codigo"
          value={accountModified.codigo}
          className={`input-data ${error ? "error" : ""}`}
          onChange={handleChange}
        />
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" name="nombre" id="nombre" className="input-data" value={accountModified.nombre} onChange={handleChange} />
        <label htmlFor="tipo">Tipo:</label>
        <select id="tipo" name="tipo" className="input-data" value={accountModified.tipo} onChange={handleChange}>
          <option value={null}></option>
          <option value="Acreedor">Acreedor</option>
          <option value="Deudor">Deudor</option>
        </select>
        <div className="buttons-container">
          {error ? <span className="error-message">⚠︎ Error: Código ya existente</span> : null}
          <input type="submit" value="Modificar" className={error ? "hide-btn" : ""} />
        </div>
      </form>
    </Modal>
  );
}
