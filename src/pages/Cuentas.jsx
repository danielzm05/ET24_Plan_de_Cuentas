import { useState, useEffect } from "react";
import { NavigationMenu } from "../components/NavigationMenu";
import { Table } from "../components/Table";
import { ModifyAccountModal } from "../components/Modals/ModifyAccountModal";
import { AddAccountModal } from "../components/Modals/AddAccountModal";
import { DeleteAccountModal } from "../components/Modals/DeleteAccountModal";
import { UseAuthContext } from "../context/AuthContext";
import { useAccounts } from "../context/AccountContext";

export function Cuentas() {
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { accounts, getAccounts } = useAccounts();

  useEffect(() => {
    getAccounts();
  }, [accounts]);

  return (
    <>
      <NavigationMenu selected="cuentas" />
      <main>
        <Table
          title="Mis Cuentas"
          modify={() => setOpenModifyModal(true)}
          add={() => setOpenAddModal(true)}
          remove={() => setOpenDeleteModal(true)}
        >
          <div className="row header">
            <span>Código</span>
            <span>Rubro</span>
            <span>A/D</span>
          </div>

          {accounts.map((account) => (
            <div className="row" key={account.id_cuenta}>
              <span>{account.id_cuenta}</span>
              <span>{account.nombre}</span>
              <span>{account.tipo_cuenta}</span>
            </div>
          ))}
        </Table>

        <ModifyAccountModal
          isOpen={openModifyModal}
          onClose={() => setOpenModifyModal(false)}
        />

        <AddAccountModal
          isOpen={openAddModal}
          onClose={() => setOpenAddModal(false)}
        />

        <DeleteAccountModal
          isOpen={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
        />
      </main>
    </>
  );
}
