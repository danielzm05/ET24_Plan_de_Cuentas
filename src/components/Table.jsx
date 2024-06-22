import * as Icon from "react-feather";
import "../styles/Table.css";

export function Table({ title, children, modify, add, remove }) {
  return (
    <div className="table">
      <span className="table-name">{title}</span>
      <ul className="table-options">
        <li onClick={modify}>
          <Icon.Edit />
          Modificar
        </li>
        <li onClick={add}>
          <Icon.PlusSquare />
          Agregar
        </li>
        <li onClick={remove}>
          <Icon.XSquare />
          Eliminar
        </li>
      </ul>
      <div className="table-content">{children}</div>
    </div>
  );
}
