import { NavigationMenu } from "../components/NavigationMenu";
import { Table } from "../components/Table";
import { useAccounts } from "../context/AccountContext";
import { useEffect, useState } from "react";

export function Alumnos() {
  const { accounts, modifications, getModifications } = useAccounts();

  useEffect(() => {
    getModifications();
    console.log(modifications);
  }, [accounts]);

  return (
    <>
      <NavigationMenu selected="alumnos" />
      <main>
        <Table
          title="Modificaciones de cuentas"
          showOptions={false}
          add={() => setOpenAddModal(true)}
        >
          <div className="row header modificacion">
            <span>Hora</span>
            <span>Descripción</span>
            <span>Fecha</span>
          </div>

          {modifications.map((mod) => (
            <div className="row modificacion" key={mod.id_modificacion}>
              <span>{mod.fecha.slice(11, 16)}</span>
              <span>{mod.descripcion}</span>
              <span>{mod.fecha.slice(0, 10)}</span>
            </div>
          ))}
        </Table>
      </main>
    </>
  );
}
