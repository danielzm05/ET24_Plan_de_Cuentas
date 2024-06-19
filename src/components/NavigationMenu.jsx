import * as Icon from "react-feather";
import { supabase } from "../backend/client";
import "../styles/NavigationMenu.css";

export function NavigationMenu({ selected }) {
  const handleLogOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="navigation-menu">
      <ul>
        <li className="navigation-menu-logo">
          <Icon.Book />
          <span className="show-item">PLAN DE CUENTAS</span>
        </li>

        <li
          className={`section-item ${selected === "alumnos" ? "selected" : ""}`}
        >
          <Icon.User />
          <span className="show-item">Alumnos</span>
        </li>

        <li
          className={`section-item ${selected === "cuentas" ? "selected" : ""}`}
        >
          <Icon.Table />
          <span className="show-item">Cuentas</span>
        </li>

        <li className="section-item" onClick={handleLogOut}>
          <Icon.LogOut />
          <span className="show-item">Cerrar Sesión</span>
        </li>
      </ul>
    </div>
  );
}
