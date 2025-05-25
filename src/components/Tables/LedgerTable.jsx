import * as Icon from "react-feather";
import * as XLSX from "xlsx";
import { Table, TableOptions } from "../Table";
import { Button } from "../UI/Button";
import { useState } from "react";
import { AddEntryModal } from "../Modals/AddEntryModal";
import { DeleteEntryModal } from "../Modals/DeleteEntryModal";

export function LedgerTable({ entries }) {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [entrySelected, setEntrySelected] = useState(false);

  const handleFilter = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  function exportTableToExcel() {
    const table = document.getElementById("libro-table");
    const worksheet = XLSX.utils.table_to_sheet(table);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja1");
    XLSX.writeFile(workbook, `Libro Diario.xlsx`);
  }

  const filteredEntries = entries.filter(
    (entry) =>
      entry.cuenta.nombre.toLowerCase().includes(searchTerm) ||
      entry.cuenta.codigo.includes(searchTerm) ||
      entry.descripcion.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      <Table title="Libro Diario">
        <TableOptions handleSearch={handleFilter}>
          <Button onClick={exportTableToExcel} title="Descargar en una planilla">
            <Icon.Download />
            Descargar
          </Button>
          <Button onClick={() => setOpenAddModal(true)}>
            <Icon.PlusSquare />
            Agregar
          </Button>
          <Button onClick={() => setOpenDeleteModal(true)} className={entrySelected ? "" : "hide-option"}>
            <Icon.XSquare />
            Eliminar
          </Button>
        </TableOptions>

        <div className="table-content">
          <table id="libro-table">
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
              {filteredEntries?.map((entry) => (
                <tr
                  className={`row asiento ${entrySelected.id_asiento === entry.id_asiento ? "selected" : ""}`}
                  key={entry.id_asiento}
                  onClick={() => setEntrySelected(entry)}
                >
                  <td>{entry.fecha}</td>
                  <td>{entry.cuenta.codigo}</td>
                  <td>{entry.cuenta.nombre}</td>
                  <td>{entry.descripcion}</td>
                  <td>{entry.debe ? `$${entry.debe}` : ""}</td>
                  <td>{entry.haber ? `$${entry.haber}` : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Table>
      <DeleteEntryModal isOpen={openDeleteModal} onClose={() => setOpenDeleteModal(false)} entry={entrySelected} />
      <AddEntryModal isOpen={openAddModal} onClose={() => setOpenAddModal(false)} />
    </>
  );
}
