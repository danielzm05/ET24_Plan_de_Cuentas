import { useEffect, useState } from "react";
import { Table } from "./Table";
import { useSchoolContext } from "../context/SchoolContext";
import { ModifyUserModal } from "./Modals/ModifyUserModal";
import { DeleteUserModal } from "./Modals/DeleteUserModal";

export function AdminUsersTable() {
  const { users, getUsers } = useSchoolContext();
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [userSelected, setUserSelected] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUser = users.filter(
    (user) => user.nombre.toLowerCase().includes(searchUser.toLowerCase()) || user.apellido.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <>
      <Table
        title="Usuarios"
        modify={() => setOpenModifyModal(true)}
        remove={() => setOpenDeleteModal(true)}
        handleSearch={(e) => setSearchUser(e.target.value)}
        isAccountSelected={userSelected}
      >
        <table>
          <thead>
            <tr className="row header admin-user">
              <th>Rol</th>
              <th>Nombre</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {filteredUser.map((user) => (
              <tr
                className={`row admin-user ${userSelected.id_usuario === user.id_usuario ? "selected" : ""}`}
                key={user.id_usuario}
                title={user.id_rol == 2 ? "Profesor" : "Alumno"}
                onClick={() => setUserSelected(user)}
                onDoubleClick={() => setOpenModifyModal(true)}
              >
                <td>{user.Rol.nombre}</td>
                <td>
                  {user.nombre} {user.apellido}
                </td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Table>
      <ModifyUserModal isOpen={openModifyModal} onClose={() => setOpenModifyModal(false)} user={userSelected} userId={userSelected.id_usuario} />
      <DeleteUserModal isOpen={openDeleteModal} onClose={() => setOpenDeleteModal(false)} user={userSelected} userId={userSelected.id_usuario} />
    </>
  );
}
