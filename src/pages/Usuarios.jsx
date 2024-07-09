import { NavigationMenu } from "../components/NavigationMenu";
import { Table } from "../components/Table";
import { AddUserModal } from "../components/Modals/AddUserModal";
import { useSchoolContext } from "../context/SchoolContext";
import * as Icon from "react-feather";
import { useState } from "react";

export function Usuarios() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const { users, getUsers } = useSchoolContext();
  useState(() => {
    getUsers();
    console.log(users);
  }, [users]);

  return (
    <>
      <NavigationMenu selected="usuarios" />
      <main>
        <h2 className="page-title">Gestionar Usuarios</h2>

        <Table
          title="Usuarios"
          showOptions={true}
          add={() => setOpenAddModal(true)}
        >
          <div className="row header user">
            <span></span>
            <span>Nombre</span>
            <span>Email</span>
          </div>

          {users.map((user) => (
            <div
              className="row user"
              key={user.id_usuario}
              title={user.id_rol == 2 ? "Profesor" : "Alumno"}
            >
              <span>{user.id_rol == 2 ? <Icon.Award /> : null}</span>
              <span>
                {user.nombre} {user.apellido}
              </span>
              <span>{user.email}</span>
            </div>
          ))}
        </Table>

        <AddUserModal
          isOpen={openAddModal}
          onClose={() => setOpenAddModal(false)}
        />
      </main>
    </>
  );
}
