import * as Icon from "react-feather";
import { useState } from "react";
import { AddUserModal } from "../components/Modals/AddUserModal";
import { AddCourseModal } from "../components/Modals/AddCourseModal";
import "../styles/CreateButton.css";

export function CreateButton() {
  const [openList, setOpenList] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openCourseModal, setOpenCourseModal] = useState(false);

  return (
    <div>
      <button className="create-button" onClick={() => setOpenList(!openList)}>
        <Icon.Plus /> Nuevo
      </button>
      <ul className="create-list">
        <li onClick={() => setOpenAddModal(true)}>
          <Icon.User /> Usuario
        </li>
        <li onClick={() => setOpenCourseModal(true)}>
          <Icon.Users /> Curso
        </li>
      </ul>
      <AddUserModal isOpen={openAddModal} onClose={() => setOpenAddModal(false)} />
      <AddCourseModal isOpen={openCourseModal} onClose={() => setOpenCourseModal(false)} />
    </div>
  );
}
