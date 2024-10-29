import { Table } from "../Table";
import { useState } from "react";

export function LedgerTable({ entries }) {
  console.log(entries);
  const [entrySelected, setEntrySelected] = useState();

  return (
    <Table title="Libro Diario">
      <div className="table-content">
        <table id="cuentas-table">
          <thead>
            <tr className="row header asiento">
              <th>Fecha</th>
              <th>Codigo</th>
              <th>Cuenta</th>
              <th>Descripción</th>
              <th>Debe</th>
              <th>Haber</th>
            </tr>
          </thead>

          <tbody>
            {entries?.map((entry) => (
              <tr className={`row asiento`} key={entry.id_asiento} onClick={() => setEntrySelected(entry)}>
                <td>{entry.fecha}</td>
                <td>{entry.Cuenta.codigo}</td>
                <td>{entry.Cuenta.nombre}</td>
                <td>{entry.descripcion}</td>
                <td>{entry.debe}</td>
                <td>{entry.haber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Table>
  );
}
