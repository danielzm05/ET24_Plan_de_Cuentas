import * as Icon from "react-feather";
import { useState } from "react";
import "../styles/CreateButton.css";

export function CreateButton() {
  const [openList, setOpenList] = useState(false);
  return (
    <div>
      <button className="create-button" onClick={() => setOpenList(!openList)}>
        <Icon.Plus /> Nuevo
      </button>
      <ul className={`create-list ${openList ? "show-list" : null}`}>
        <li>
          {" "}
          <Icon.User /> Usuario
        </li>
        <li>
          {" "}
          <Icon.Users /> Curso
        </li>
      </ul>
    </div>
  );
}
