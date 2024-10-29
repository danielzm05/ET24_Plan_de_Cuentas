import { useEffect } from "react";
import { useAccounts } from "../../context/AccountContext";
import { Modal } from "../Modal";
import { Table } from "../Table";

export function StudentTableModal({ isOpen, onClose, student }) {
  const { accounts, getAccounts } = useAccounts();

  useEffect(() => {
    getAccounts(student.id_usuario);
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} isClose={onClose}>
      <Table title={`Cuentas de ${student?.usuario?.nombre}`}>
        <div className="table-content">
          <table>
            <thead>
              <tr className="row header cuenta">
                <th>Código</th>
                <th>Rubro</th>
                <th>A/D</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr className="row cuenta" key={account.id_cuenta}>
                  <td>{account.codigo}</td>
                  <td>{account.nombre}</td>
                  <td className={`tipo-cuenta ${account.tipo_cuenta}`}>{account.tipo_cuenta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Table>
    </Modal>
  );
}
