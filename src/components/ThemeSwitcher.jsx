import * as Icon from "react-feather";
import { useThemeContext } from "../context/ThemeContext";

export function ThemeSwitcher() {
  const { darkMode, changeTheme } = useThemeContext();
  return (
    <div className="theme-switcher" onClick={changeTheme}>
      {darkMode ? <Icon.Sun /> : <Icon.Moon />}
    </div>
  );
}
