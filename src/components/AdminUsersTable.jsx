import { useEffect, useState } from "react";
import { Table } from "./Table";
import { useSchoolContext } from "../context/SchoolContext";
import { ModifyUserModal } from "./Modals/ModifyUserModal";
import { DeleteUserModal } from "./Modals/DeleteUserModal";
import * as Icon from "react-feather";

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
        <div className="row header admin-user">
          <span>Rol</span>
          <span>Nombre</span>
          <span>Email</span>
        </div>

        {filteredUser.map((user) => (
          <div
            className={`row admin-user ${userSelected.id_usuario === user.id_usuario ? "selected" : ""}`}
            key={user.id_usuario}
            title={user.id_rol == 2 ? "Profesor" : "Alumno"}
            onClick={() => setUserSelected(user)}
            onDoubleClick={() => setOpenModifyModal(true)}
          >
            <span>{user.Rol.nombre}</span>
            <span>
              {user.nombre} {user.apellido}
            </span>
            <span>{user.email}</span>
          </div>
        ))}
      </Table>
      <ModifyUserModal isOpen={openModifyModal} onClose={() => setOpenModifyModal(false)} user={userSelected} userId={userSelected.id_usuario} />
      <DeleteUserModal isOpen={openDeleteModal} onClose={() => setOpenDeleteModal(false)} user={userSelected} userId={userSelected.id_usuario} />
    </>
  );
}
