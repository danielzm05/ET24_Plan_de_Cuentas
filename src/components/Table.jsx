import * as Icon from "react-feather";
import "../styles/Table.css";

export function Table({
  title,
  showOptions = true,
  children,
  modify,
  add,
  remove,
  handleSearch,
  isAccountSelected,
}) {
  return (
    <div className="table">
      <h2 className="table-name">{title}</h2>

      <div className="table-options">
        <input
          className="search-bar"
          type="text"
          placeholder="Buscar.."
          onChange={handleSearch}
        />

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
