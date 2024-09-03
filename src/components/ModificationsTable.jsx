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
    <Table title={`Transacciones ${user.usuario ? user?.usuario?.nombre : ""}`} handleSearch={(e) => setSearchModification(e.target.value)}>
      <ul className="table-tools">
        <li onClick={deleteUserModifications}>
          <Icon.Trash />
          Eliminar
        </li>
      </ul>

      <table>
        <thead>
          <tr className="row header modificacion">
            <th>Hora</th>
            <th>Descripción</th>
            <th>Fecha</th>
          </tr>
        </thead>

        <tbody>
          {filteredModifications.length === 0 ? (
            <tr>{user?.usuario?.nombre} No ha hecho modificaciones en sus cuentas</tr>
          ) : (
            filteredModifications.map((mod) => (
              <tr className="row modificacion" key={mod.id_modificacion}>
                <td>{mod.fecha.slice(11, 16)}</td>
                <td>{mod.descripcion}</td>
                <td>{mod.fecha.slice(0, 10)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Table>
  );
}
