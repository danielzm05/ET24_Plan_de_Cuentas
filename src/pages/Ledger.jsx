import { NavigationMenu } from "../components/NavigationMenu";
import { LedgerTable } from "../components/Tables/LedgerTable";
import { useLedgerContext } from "../context/LedgerContext";
import { useEffect } from "react";
export function Ledger() {
  const { entries, getEntries } = useLedgerContext();

  useEffect(() => {
    getEntries();
  }, []);

  return (
    <>
      <NavigationMenu selected="libro-diario" />
      <main>
        <h2 className="page-title">Libro Diario</h2>
        <LedgerTable entries={entries}></LedgerTable>
      </main>
    </>
  );
}
