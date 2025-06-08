import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAccounts } from "../context/AccountContext";
import { useLedgerContext } from "../context/LedgerContext";
import { LedgerTable } from "../components/Tables/LedgerTable";
import { AccountsTable } from "../components/Tables/AccountsTable";

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

      <AccountsTable title={"Plan de cuentas"} accounts={accounts} options={false} />

      <LedgerTable entries={entries} options={false}></LedgerTable>
    </main>
  );
}
