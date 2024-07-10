import { useEffect } from "react";
import { NavigationMenu } from "../components/NavigationMenu";
import { Table } from "../components/Table";
import { useAccounts } from "../context/AccountContext";

export function Alumnos() {
  const { modifications, getModifications } = useAccounts();

  useEffect(() => {
    getModifications();
  }, [modifications]);

  return (
    <>
      <NavigationMenu selected="alumnos" />
      <main>
        <Table title="Alumnos">
          <div className="row header modificacion">
            <span>Nombre</span>
            <span>Apellido</span>
            <span>Curso</span>
          </div>
        </Table>

        <Table title="Modificaciones de cuentas">
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
