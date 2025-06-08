import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAccounts } from "../context/AccountContext";
import { useLedgerContext } from "../context/LedgerContext";
import { Table } from "../components/Table";
import { LedgerTable } from "../components/Tables/LedgerTable";
import { useAuthContext } from "../context/AuthContext";

export function StudentView() {
  const { accounts, getAccounts } = useAccounts();
  const { entries, getEntries } = useLedgerContext();
  const { id_estudiante } = useParams();

  useEffect(() => {
    getAccounts(id_estudiante);
    getEntries(id_estudiante);
  }, []);

  return (
    <main>
      <h1>Vista Estudiante</h1>

      <Table title="Plan de Cuentas">
        <div className="table-content">
          <table>
            <thead>
              <tr className="row header cuenta">
                <th>Código</th>
                <th>Rubro</th>
                <th>A/D</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr className="row cuenta" key={account.id_cuenta}>
                  <td>{account.codigo}</td>
                  <td>{account.nombre}</td>
                  <td className={`tipo-cuenta ${account.tipo_cuenta}`}>{account.tipo_cuenta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Table>

      <LedgerTable entries={entries}></LedgerTable>
    </main>
  );
}
