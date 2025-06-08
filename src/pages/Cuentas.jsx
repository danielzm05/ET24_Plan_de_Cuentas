import { useEffect } from "react";
import { NavigationMenu } from "../components/NavigationMenu";
import { useAccounts } from "../context/AccountContext";
import { AccountsTable } from "../components/Tables/AccountsTable";
import { useAuthContext } from "../context/AuthContext";

export function Cuentas() {
  const { accounts, getAccounts } = useAccounts();
  const { userInfo } = useAuthContext();

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <>
      <NavigationMenu selected="cuentas" />
      <main>
        <h2 className="page-title">Hola {userInfo ? userInfo?.nombre : ""}! 👋</h2>
        <AccountsTable title={`Plan de cuentas ${userInfo?.empresa ? userInfo?.empresa : ""} `} accounts={accounts} />
      </main>
    </>
  );
}
