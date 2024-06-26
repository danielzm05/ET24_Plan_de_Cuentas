import * as Icon from "react-feather";
import "../styles/Table.css";

export function Table({
  title,
  showOptions = true,
  children,
  modify,
  add,
  remove,
  isAccountSelected,
}) {
  return (
    <div className="table">
      <span className="table-name">{title}</span>

      <div className="table-options">
        <input className="search-bar" type="text" placeholder="Buscar.." />
        {showOptions && (
          <ul>
            <li onClick={add}>
              <Icon.PlusSquare />
              Agregar
            </li>
            <li
              onClick={remove}
              className={isAccountSelected ? "" : "hide-option"}
            >
              <Icon.XSquare />
              Eliminar
            </li>
            <li
              onClick={modify}
              className={isAccountSelected ? "" : "hide-option"}
            >
              <Icon.Edit />
              Modificar
            </li>
          </ul>
        )}
      </div>

      <div className="table-content">{children}</div>
    </div>
  );
}
