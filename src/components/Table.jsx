import * as Icon from "react-feather";
import "../styles/Table.css";

export function Table() {
  return (
    <div className="table">
      <span className="table-name">Mis Cuentas</span>
      <ul className="table-options">
        <li>
          <Icon.Edit />
          Modificar
        </li>
        <li>
          <Icon.PlusSquare />
          Agregar
        </li>
        <li>
          <Icon.XSquare />
          Eliminar
        </li>
      </ul>
      <div className="table-content">
        <div className="row header">
          <span>Código</span>
          <span>Rubro</span>
          <span>A/D</span>
        </div>

        <div className="row">
          <span>1.0.0.00.00</span>
          <span>Banco en Nación Argentina en Pesos</span>
          <span>Acreedor</span>
        </div>

        <div className="row">
          <span>1.0.0.00.00</span>
          <span>Banco en Nación Argentina en Pesos</span>
          <span>Acreedor</span>
        </div>

        <div className="row">
          <span>1.0.0.00.00</span>
          <span>Banco en Nación Argentina en Pesos</span>
          <span>Acreedor</span>
        </div>
      </div>
    </div>
  );
}
