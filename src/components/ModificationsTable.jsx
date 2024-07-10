import { useState } from "react";
import { Table } from "./Table";

export function ModificationTable({ user, modifications }) {
  const [searchModification, setSearchModification] = useState("");

  const filteredModifications = modifications.filter((mod) =>
    mod.descripcion.toLowerCase().includes(searchModification.toLowerCase())
  );

  return (
    <Table
      title={`Transacciones ${user.nombre ? user.nombre : ""}`}
      showOptions={false}
      handleSearch={(e) => setSearchModification(e.target.value)}
    >
      <div className="row header modificacion">
        <span>Hora</span>
        <span>Descripción</span>
        <span>Fecha</span>
      </div>

      {filteredModifications.map((mod) => (
        <div className="row modificacion" key={mod.id_modificacion}>
          <span>{mod.fecha.slice(11, 16)}</span>
          <span>{mod.descripcion}</span>
          <span>{mod.fecha.slice(0, 10)}</span>
        </div>
      ))}
    </Table>
  );
}
