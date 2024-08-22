import { useContext, createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  const changeTheme = () => {
    setDarkMode((prevState) => !prevState);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return <ThemeContext.Provider value={{ darkMode, changeTheme }}>{children}</ThemeContext.Provider>;
};
