import { Modal } from "../Modal";
import { useState, useEffect } from "react";
import * as Icon from "react-feather";
import { Button } from "../Button";
import { useAccounts } from "../../context/AccountContext";
import { useLedgerContext } from "../../context/LedgerContext";

export function AddEntryModal({ isOpen, onClose }) {
  const [fecha, setFecha] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [items, setItems] = useState([{ fecha: "", descripcion: "", id_cuenta: "", debe: 0, haber: 0 }]);
  const { getAccounts } = useAccounts();
  const { createEntry } = useLedgerContext();

  useEffect(() => {
    getAccounts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    createEntry(items);
    setItems([{ fecha: "", descripcion: "", id_cuenta: "", debe: 0, haber: 0 }]);

    onClose();
    console.log(items);
  };

  const handleItemChange = (index, e) => {
    const updatedItems = items.map((item, i) => (i === index ? { ...item, [e.target.name]: e.target.value } : item));
    setItems(updatedItems);
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const AddItem = () => {
    setItems([...items, { fecha, descripcion, id_cuenta: "", debe: 0, haber: 0 }]);
  };

  useEffect(() => {
    setItems(items.map((item) => ({ ...item, fecha, descripcion })));
  }, [fecha, descripcion]);

  return (
    <Modal isOpen={isOpen} isClose={onClose}>
      <h3>Crear Asiento</h3>
      <form className="form add-entry" onSubmit={handleSubmit}>
        <label htmlFor="fecha">Fecha:</label>
        <input type="date" name="fecha" id="fecha" onChange={(e) => setFecha(e.target.value)} required />

        <label htmlFor="descripcion">Descripción:</label>
        <input type="text" name="descripcion" id="descripcion" onChange={(e) => setDescripcion(e.target.value)} maxLength={60} />

        <div className="items-container">
          <label htmlFor="id_cuenta">Cuenta:</label>
          <label htmlFor="debe">Debe:</label>
          <label htmlFor="haber">Haber:</label>
          <br />
          {items.map((item, index) => (
            <NewItemInputs item={item} index={index} handleChange={handleItemChange} deleteItem={deleteItem} key={index} />
          ))}

          <Button className="add-item" onClick={AddItem}>
            <Icon.PlusCircle size={16} />
            Nuevo Item
          </Button>
        </div>

        <div className="buttons-container">
          <input type="submit" value="Crear Asiento" />
        </div>
      </form>
    </Modal>
  );
}

function NewItemInputs({ item, index, handleChange, deleteItem }) {
  const { accounts } = useAccounts();

  return (
    <>
      <select id="id_cuenta" name="id_cuenta" value={item.id_cuenta} className="input-data" onChange={(e) => handleChange(index, e)} required>
        <option disabled value="">
          Selecciona una cuenta
        </option>
        {accounts.map((c) => (
          <option value={c.id_cuenta} key={c.id_cuenta}>
            {c.codigo} {c.nombre}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="debe"
        id="debe"
        value={item.debe}
        onChange={(e) => handleChange(index, e)}
        placeholder="0.00"
        step="0.01"
        min="-999999999"
        max="999999999"
      />

      <input
        type="number"
        name="haber"
        id="haber"
        value={item.haber}
        onChange={(e) => handleChange(index, e)}
        placeholder="0.00"
        step="0.01"
        min="-999999999"
        max="999999999"
      />

      {index > 0 ? (
        <Button onClick={() => deleteItem(index)}>
          <Icon.Trash size={16} />
        </Button>
      ) : (
        <br></br>
      )}
    </>
  );
}
