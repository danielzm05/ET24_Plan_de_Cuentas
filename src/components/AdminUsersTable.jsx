import { useEffect, useState } from "react";
import { Table } from "./Table";
import { useSchoolContext } from "../context/SchoolContext";
import { ModifyUserModal } from "./Modals/ModifyUserModal";
import * as Icon from "react-feather";

export function AdminUsersTable() {
  const { users, getUsers } = useSchoolContext();
  const [openModifyModal, setOpenModifyModal] = useState(false);
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
        handleSearch={(e) => setSearchUser(e.target.value)}
        isAccountSelected={userSelected}
      >
        <div className="row header user">
          <span></span>
          <span>Nombre</span>
          <span>Email</span>
        </div>

        {filteredUser.map((user) => (
          <div
            className={`row user ${userSelected.id_usuario === user.id_usuario ? "selected" : ""}`}
            key={user.id_usuario}
            title={user.id_rol == 2 ? "Profesor" : "Alumno"}
            onClick={() => setUserSelected(user)}
            onDoubleClick={() => setOpenModifyModal(true)}
          >
            <span>{user.id_rol == 2 ? <Icon.Award /> : null}</span>
            <span>
              {user.nombre} {user.apellido}
            </span>
            <span>{user.email}</span>
          </div>
        ))}
      </Table>
      <ModifyUserModal isOpen={openModifyModal} onClose={() => setOpenModifyModal(false)} user={userSelected} userId={userSelected.id_usuario} />
    </>
  );
}
