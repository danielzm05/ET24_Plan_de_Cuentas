import { useState, useEffect } from "react";
import { NavigationMenu } from "../components/NavigationMenu";
import { Table } from "../components/Table";
import { ModifyAccountModal } from "../components/Modals/ModifyAccountModal";
import { AddAccountModal } from "../components/Modals/AddAccountModal";
import { DeleteAccountModal } from "../components/Modals/DeleteAccountModal";
import { useAccounts } from "../context/AccountContext";
import { useAuthContext } from "../context/AuthContext";

export function Cuentas() {
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [accountSelected, setAccountSelected] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { accounts, getAccounts } = useAccounts();
  const { userInfo } = useAuthContext();

  useEffect(() => {
    getAccounts();
  }, []);

  const handleFilter = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAccounts = accounts.filter(
    (account) => account.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || account.codigo.includes(searchTerm)
  );

  return (
    <>
      <NavigationMenu selected="cuentas" />
      <main>
        <h2 className="page-title">Hola! {userInfo ? userInfo?.nombre : ""}👋</h2>
        <Table
          title={`Cuentas ${userInfo?.empresa}`}
          modify={() => setOpenModifyModal(true)}
          add={() => setOpenAddModal(true)}
          remove={() => setOpenDeleteModal(true)}
          isAccountSelected={accountSelected}
          handleSearch={handleFilter}
        >
          <thead>
            <tr className="row header cuenta">
              <th>Código</th>
              <th>Rubro</th>
              <th>A/D</th>
            </tr>
          </thead>

          <tbody>
            {filteredAccounts.map((account) => (
              <tr
                className={`row cuenta ${accountSelected.id_cuenta === account.id_cuenta ? "selected" : ""}`}
                key={account.id_cuenta}
                onClick={() => setAccountSelected(account)}
                onDoubleClick={() => setOpenModifyModal(true)}
              >
                <td>{account.codigo}</td>
                <td>{account.nombre}</td>
                <td className={`tipo-cuenta ${account.tipo_cuenta}`}>{account.tipo_cuenta}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <ModifyAccountModal
          isOpen={openModifyModal}
          onClose={() => setOpenModifyModal(false)}
          account={accountSelected}
          id={accountSelected.id_cuenta}
        />

        <AddAccountModal isOpen={openAddModal} onClose={() => setOpenAddModal(false)} />

        <DeleteAccountModal isOpen={openDeleteModal} onClose={() => setOpenDeleteModal(false)} account={accountSelected} />
      </main>
    </>
  );
}
