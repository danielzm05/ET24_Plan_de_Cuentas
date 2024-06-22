import { useState, useEffect } from "react";
import { NavigationMenu } from "../components/NavigationMenu";
import { Table } from "../components/Table";
import { ModifyAccountModal } from "../components/Modals/ModifyAccountModal";
import { AddAccountModal } from "../components/Modals/AddAccountModal";
import { DeleteAccountModal } from "../components/Modals/DeleteAccountModal";
import { useAccounts } from "../context/AccountContext";

export function Cuentas() {
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [accountSelected, setAccountSelected] = useState(null);
  const { accounts, getAccounts } = useAccounts(false);

  useEffect(() => {
    getAccounts();
  }, [accounts]);

  const handleAccountSelected = (id) => {
    setAccountSelected(id);
  };

  return (
    <>
      <NavigationMenu selected="cuentas" />
      <main>
        <Table
          title="Mis Cuentas"
          modify={() => setOpenModifyModal(true)}
          add={() => setOpenAddModal(true)}
          remove={() => setOpenDeleteModal(true)}
          isAccountSelected={accountSelected}
        >
          <div className="row header">
            <span>Código</span>
            <span>Rubro</span>
            <span>A/D</span>
          </div>

          {accounts.map((account) => (
            <div
              className={`row ${
                accountSelected === account.id_cuenta ? "selected" : ""
              }`}
              key={account.id_cuenta}
              onClick={() => handleAccountSelected(account.id_cuenta)}
            >
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
          accountSelected={accountSelected}
        />
      </main>
    </>
  );
}
