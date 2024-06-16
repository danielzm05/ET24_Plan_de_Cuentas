import { useState } from "react";
import { NavigationMenu } from "../components/NavigationMenu";
import { Table } from "../components/Table";
import { Modal } from "../components/Modal";

function ModifyAccountModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} isClose={onClose}>
      <h3>Modificar Cuenta</h3>
      <form className="form">
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" name="nombre" id="nombre" className="input-data" />
        <label htmlFor="tipo">Tipo:</label>
        <select id="tipo" name="tipo" className="input-data">
          <option value="Acreedor">Acreedor</option>
          <option value="Deudor">Deudor</option>
        </select>
        <div className="submit-container">
          <input type="submit" value="Modificar" />
        </div>
      </form>
    </Modal>
  );
}

function AddAccountModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} isClose={onClose}>
      <h3>Nueva Cuenta</h3>
      <form className="form">
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" name="nombre" id="nombre" className="input-data" />
        <label htmlFor="tipo">Tipo:</label>
        <select id="tipo" name="tipo" className="input-data">
          <option value="Acreedor">Acreedor</option>
          <option value="Deudor">Deudor</option>
        </select>
        <div className="submit-container">
          <input type="submit" value="Crear Cuenta" />
        </div>
      </form>
    </Modal>
  );
}

export function Cuentas() {
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  return (
    <>
      <NavigationMenu />
      <main>
        <Table
          modify={() => setOpenModifyModal(true)}
          add={() => setOpenAddModal(true)}
        />

        <ModifyAccountModal
          isOpen={openModifyModal}
          onClose={() => setOpenModifyModal(false)}
        />

        <AddAccountModal
          isOpen={openAddModal}
          onClose={() => setOpenAddModal(false)}
        />
      </main>
    </>
  );
}
