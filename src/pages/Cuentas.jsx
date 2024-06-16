import { NavigationMenu } from "../components/NavigationMenu";
import { Table } from "../components/Table";
import { Modal } from "../components/Modal";
import { useState } from "react";

export function Cuentas() {
  const [openModal, setOpenModal] = useState(true);

  return (
    <>
      <NavigationMenu />
      <main>
        <Table />
        <Modal isOpen={openModal} isClose={() => setOpenModal(false)}>
          <h3>Modificar Cuenta</h3>
        </Modal>
      </main>
    </>
  );
}
