import * as XLSX from "xlsx";
import * as Icon from "react-feather";
import { Table, TableOptions } from "../Table";
import { ModifyAccountModal } from "../Modals/ModifyAccountModal";
import { AddAccountModal } from "../Modals/AddAccountModal";
import { DeleteAccountModal } from "../Modals/DeleteAccountModal";
import { useAuthContext } from "../../context/AuthContext";
import { Button } from "../UI/Button";
import { useState } from "react";

export function AccountsTable({ accounts }) {
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [accountSelected, setAccountSelected] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { userInfo } = useAuthContext();

  const handleFilter = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAccounts = accounts.filter(
    (account) => account.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || account.codigo.includes(searchTerm)
  );

  function exportTableToExcel() {
    const table = document.getElementById("cuentas-table");
    const worksheet = XLSX.utils.table_to_sheet(table);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja1");
    XLSX.writeFile(workbook, `Cuentas ${userInfo ? userInfo?.nombre : ""}.xlsx`);
  }

  return (
    <>
      <Table title={`Cuentas ${userInfo?.empresa}`} handleSearch={handleFilter}>
        <TableOptions handleSearch={handleFilter}>
          <Button onClick={exportTableToExcel} title="Descargar en una planilla">
            <Icon.Download />
            Descargar
          </Button>
          <Button onClick={() => setOpenAddModal(true)}>
            <Icon.PlusSquare />
            Agregar
          </Button>
          <Button onClick={() => setOpenDeleteModal(true)} className={accountSelected ? "" : "hide-option"}>
            <Icon.XSquare />
            Eliminar
          </Button>
          <Button onClick={() => setOpenModifyModal(true)} className={accountSelected ? "" : "hide-option"}>
            <Icon.Edit />
            Modificar
          </Button>
        </TableOptions>

        <div className="table-content">
          <table id="cuentas-table">
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
          </table>
        </div>
      </Table>

      <ModifyAccountModal
        isOpen={openModifyModal}
        onClose={() => setOpenModifyModal(false)}
        account={accountSelected}
        id={accountSelected.id_cuenta}
      />

      <AddAccountModal isOpen={openAddModal} onClose={() => setOpenAddModal(false)} />

      <DeleteAccountModal isOpen={openDeleteModal} onClose={() => setOpenDeleteModal(false)} account={accountSelected} />
    </>
  );
}
