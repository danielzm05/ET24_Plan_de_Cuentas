import * as Icon from "react-feather";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import "../styles/NavigationMenu.css";

export function NavigationMenu({ selected }) {
  const { logOut } = useAuthContext();
  const { userInfo } = useAuthContext();

  return (
    <div className="navigation-menu">
      <ul>
        <li className="navigation-menu-logo">
          <Icon.Book />
          <span className="hide-item">PLAN DE CUENTAS</span>
        </li>
        <MenuItem roles={[3, 1]} title="Mis Cursos" name="cursos" selected={selected} userRol={userInfo?.rol}>
          <Icon.Users />
        </MenuItem>

        <MenuItem roles={[2, 1]} title="Mis Cursos" name="mis-cursos" selected={selected} userRol={userInfo?.rol}>
          <Icon.Users />
        </MenuItem>

        <MenuItem roles={[1, 2, 3]} title="Cuentas" name="cuentas" selected={selected} userRol={userInfo?.rol}>
          <Icon.Table />
        </MenuItem>

        <MenuItem roles={[1, 2, 3]} title="Libro Diario" name="libro-diario" selected={selected} userRol={userInfo?.rol}>
          <Icon.BookOpen />
        </MenuItem>

        <MenuItem roles={[1, 2, 3]} title="Ajustes" name="ajustes" selected={selected} userRol={userInfo?.rol}>
          <Icon.Settings />
        </MenuItem>

        <li className="section-item logout-btn" onClick={logOut}>
          <Icon.LogOut />
          <span className="hide-item">Cerrar Sesión</span>
        </li>
      </ul>
    </div>
  );
}

function MenuItem({ roles, title, name, children, selected, userRol}) {
  const navigate = useNavigate();

  if (roles.some((role) => role === userRol)) {
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
