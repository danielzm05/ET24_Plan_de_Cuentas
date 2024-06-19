import { AddStudentModal } from "../components/Modals/AddStudentModal";
import { NavigationMenu } from "../components/NavigationMenu";
import { Table } from "../components/Table";
import { useState } from "react";

export function Alumnos() {
  const [openAddModal, setOpenAddModal] = useState(false);

  return (
    <>
      <NavigationMenu selected="alumnos" />
      <main>
        <Table title="Alumnos" add={() => setOpenAddModal(true)} />

        <AddStudentModal
          isOpen={openAddModal}
          onClose={() => setOpenAddModal(false)}
        />
      </main>
    </>
  );
}
