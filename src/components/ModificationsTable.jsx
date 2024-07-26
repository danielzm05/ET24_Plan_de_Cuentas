import { useState } from "react";
import * as Icon from "react-feather";
import { Table } from "./Table";

export function ModificationTable({ user, modifications, deleteAll }) {
  const [searchModification, setSearchModification] = useState("");

  const filteredModifications = modifications.filter((mod) => mod.descripcion.toLowerCase().includes(searchModification.toLowerCase()));
  return (
    <Table title={`Transacciones ${user.nombre ? user.nombre : ""}`} handleSearch={(e) => setSearchModification(e.target.value)}>
      <ul className="table-tools">
        <li onClick={deleteAll}>
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
