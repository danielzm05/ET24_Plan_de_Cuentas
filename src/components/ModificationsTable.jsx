import * as Icon from "react-feather";
import { Table, TableOptions } from "./Table";
import { Button } from "./Button";
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
    <Table title={`Transacciones ${user.usuario ? user?.usuario?.nombre : ""}`}>
      <TableOptions handleSearch={(e) => setSearchModification(e.target.value)}>
        <Button onClick={deleteUserModifications}>
          <Icon.Trash />
          Eliminar
        </Button>
      </TableOptions>

      <div className="table-content">
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
              <tr>
                <td>{user?.usuario?.nombre} No ha hecho modificaciones en sus cuentas</td>
              </tr>
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
      </div>
    </Table>
  );
}
