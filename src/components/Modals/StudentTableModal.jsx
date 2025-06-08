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

    </Modal>
  );
}
