import * as Icon from "react-feather";
import { supabase } from "../backend/client";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
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

        <MenuItem roles={[1]} title="Usuarios" name="usuarios" selected={selected}>
          <Icon.User />
        </MenuItem>

        <MenuItem roles={[2, 1]} title="Mis Cursos" name="cursos" selected={selected}>
          <Icon.Users />
        </MenuItem>

        <MenuItem roles={[1, 2, 3]} title="Cuentas" name="cuentas" selected={selected}>
          <Icon.Table />
        </MenuItem>

        <MenuItem roles={[1, 2, 3]} title="Ajustes" name="ajustes" selected={selected}>
          <Icon.Settings />
        </MenuItem>

        <li className="section-item logout-btn" onClick={handleLogOut}>
          <Icon.LogOut />
          <span className="hide-item">Cerrar Sesión</span>
        </li>
      </ul>
    </div>
  );
}

function MenuItem({ roles, title, name, children, selected }) {
  const navigate = useNavigate();
  const { userInfo } = useAuthContext();

  if (roles.includes(userInfo.id_rol)) {
    return (
      <li
        onClick={() => {
          navigate(`/${name}`);
        }}
        className={`section-item ${selected === name ? "selected" : ""}`}
      >
        {children}
        <span className="hide-item">{title}</span>
      </li>
    );
  } else {
    return null;
  }
}
