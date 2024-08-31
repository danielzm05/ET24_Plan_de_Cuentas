import * as Icon from "react-feather";
import "../styles/Table.css";

export function Table({ title, children, modify = false, add = false, remove = false, handleSearch, isAccountSelected }) {
  return (
    <div className="table">
      <h2 className="table-name">{title}</h2>

      <div className="table-options">
        <input className="search-bar" type="text" placeholder="Buscar.." onChange={handleSearch} />

        <ul className="table-tools">
          {add && (
            <li onClick={add}>
              <Icon.PlusSquare />
              Agregar
            </li>
          )}

          {remove && (
            <li onClick={remove} className={isAccountSelected ? "" : "hide-option"}>
              <Icon.XSquare />
              Eliminar
            </li>
          )}

          {modify && (
            <li onClick={modify} className={isAccountSelected ? "" : "hide-option"}>
              <Icon.Edit />
              Modificar
            </li>
          )}
        </ul>
      </div>

      <div className="table-content">{children}</div>
    </div>
  );
}
