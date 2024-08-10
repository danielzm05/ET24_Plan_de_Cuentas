import * as Icon from "react-feather";
import { Table } from "./Table";
import { useState, useEffect } from "react";
import { useAccounts } from "../context/AccountContext";

export function ModificationTable({ user }) {
  const { modifications, getModifications, deleteModifications } = useAccounts();
  const [searchModification, setSearchModification] = useState("");

  useEffect(() => {
    getModifications(user.id_usuario);
  }, [user]);

  const deleteUserModifications = () => {
    deleteModifications(user.id_usuario);
    getModifications(user.id_usuario);
  };

  const filteredModifications = modifications.filter((mod) => mod.descripcion.toLowerCase().includes(searchModification.toLowerCase()));
  return (
    <Table title={`Transacciones ${user.nombre ? user.nombre : ""}`} handleSearch={(e) => setSearchModification(e.target.value)}>
      <ul className="table-tools">
        <li onClick={deleteUserModifications}>
          <Icon.Trash />
          Eliminar
        </li>
      </ul>
      <div className="row header modificacion">
        <span>Hora</span>
        <span>Descripción</span>
        <span>Fecha</span>
      </div>

      {filteredModifications.length === 0 ? (
        <p>{user?.usuario?.nombre} no ha hecho modificaciones en sus cuentas</p>
      ) : (
        filteredModifications.map((mod) => (
          <div className="row modificacion" key={mod.id_modificacion}>
            <span>{mod.fecha.slice(11, 16)}</span>
            <span>{mod.descripcion}</span>
            <span>{mod.fecha.slice(0, 10)}</span>
          </div>
        ))
      )}
    </Table>
  );
}
