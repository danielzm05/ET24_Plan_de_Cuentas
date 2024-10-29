import { Modal } from "../Modal";
import { useState, useEffect } from "react";
import { useAccounts } from "../../context/AccountContext";
import { useLedgerContext } from "../../context/LedgerContext";

export function AddEntryModal({ isOpen, onClose }) {
  const [newEntry, setNewEntry] = useState();
  const { accounts, getAccounts } = useAccounts();
  const { createEntry } = useLedgerContext();

  useEffect(() => {
    getAccounts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createEntry(newEntry);
    setNewEntry({});
    onClose();
  };
  return (
    <Modal isOpen={isOpen} isClose={onClose}>
      <h3>Crear Asiento</h3>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="fecha">Fecha:</label>
        <input type="date" name="fecha" id="fecha" onChange={handleChange} required />

        <label htmlFor="id_cuenta">Cuenta:</label>
        <select id="id_cuenta" name="id_cuenta" defaultValue="" className="input-data" onChange={handleChange} required>
          <option disabled value="">
            Selecciona una cuenta
          </option>

          {accounts.map((c) => (
            <option value={c.id_cuenta} key={c.id_cuenta}>
              {c.codigo} {c.nombre}
            </option>
          ))}
        </select>

        <label htmlFor="descripcion">Descripción:</label>
        <input type="text" name="descripcion" id="descripcion" onChange={handleChange} maxLength={60} />

        <label htmlFor="debe">Debe:</label>
        <input type="number" name="debe" id="debe" onChange={handleChange} step="0.01" min="-999999999" max="999999999" />

        <label htmlFor="haber">Haber:</label>
        <input type="number" name="haber" id="haber" onChange={handleChange} step="0.01" min="-999999999" max="999999999" />

        <div className="buttons-container">
          <input type="submit" value="Crear Asiento" />
        </div>
      </form>
    </Modal>
  );
}
