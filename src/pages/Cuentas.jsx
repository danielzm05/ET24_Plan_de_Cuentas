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
  const [accountSelected, setAccountSelected] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const { accounts, getAccounts } = useAccounts();
  const { userInfo } = useAuthContext();

  useEffect(() => {
    getAccounts();
  }, []);

  const handleAccountSelected = (id, codigo, nombre, tipo) => {
    setAccountSelected({
      id: id,
      codigo: codigo,
      nombre: nombre,
      tipo: tipo,
    });
  };

  const handleFilter = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAccounts = accounts.filter((account) => account.nombre.toLowerCase().includes(searchTerm.toLowerCase()));

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
          isAccountSelected={accountSelected.id}
          handleSearch={handleFilter}
        >
          <div className="row header cuenta">
            <span>Código</span>
            <span>Rubro</span>
            <span>A/D</span>
          </div>

          {filteredAccounts.map((account) => (
            <div
              className={`row cuenta ${accountSelected.id === account.id_cuenta ? "selected" : ""}`}
              key={account.id_cuenta}
              onClick={() => handleAccountSelected(account.id_cuenta, account.codigo, account.nombre, account.tipo_cuenta)}
              onDoubleClick={() => setOpenModifyModal(true)}
            >
              <span>{account.codigo}</span>
              <span>{account.nombre}</span>
              <span className={`tipo-cuenta ${account.tipo_cuenta}`}>{account.tipo_cuenta}</span>
            </div>
          ))}
        </Table>

        <ModifyAccountModal isOpen={openModifyModal} onClose={() => setOpenModifyModal(false)} account={accountSelected} id={accountSelected.id} />

        <AddAccountModal isOpen={openAddModal} onClose={() => setOpenAddModal(false)} />

        <DeleteAccountModal isOpen={openDeleteModal} onClose={() => setOpenDeleteModal(false)} account={accountSelected} />
      </main>
    </>
  );
}
