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
          <span className="hide-item">PLAN DE CUENTAS</span>
        </li>

        <li
          className={`section-item ${selected === "alumnos" ? "selected" : ""}`}
        >
          <Icon.User />
          <span className="hide-item">Alumnos</span>
        </li>

        <li
          className={`section-item ${selected === "cuentas" ? "selected" : ""}`}
        >
          <Icon.Table />
          <span className="hide-item">Cuentas</span>
        </li>

        <li className="section-item logout-btn" onClick={handleLogOut}>
          <Icon.LogOut />
          <span className="hide-item">Cerrar Sesión</span>
        </li>
      </ul>
    </div>
  );
}
