import * as Icon from "react-feather";
import "../styles/NavigationMenu.css";

export function NavigationMenu() {
  return (
    <div className="navigation-menu">
      <ul>
        <li className="navigation-menu-logo">
          <Icon.Book />
          <span className="show-item">PLAN DE CUENTAS</span>
        </li>

        <li className="section-item">
          <Icon.User />
          <span className="show-item">Alumnos</span>
        </li>

        <li className="section-item selected">
          <Icon.Table />
          <span className="show-item">Cuentas</span>
        </li>

        <li className="section-item">
          <Icon.LogOut />
          <span className="show-item">Cerrar Sesión</span>
        </li>
      </ul>
    </div>
  );
}
