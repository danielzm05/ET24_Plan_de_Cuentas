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
          <div className="row header cuenta">
            <span>Código</span>
            <span>Rubro</span>
            <span>A/D</span>
          </div>

          {accounts.map((account) => (
            <div className="row cuenta" key={account.id_cuenta}>
              <span>{account.codigo}</span>
              <span>{account.nombre}</span>
              <span className={`tipo-cuenta ${account.tipo_cuenta}`}>{account.tipo_cuenta}</span>
            </div>
          ))}
        </div>
      </Table>
    </Modal>
  );
}
