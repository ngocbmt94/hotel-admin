import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

export default function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDark");

  useEffect(() => {
    const htmlEl = document.documentElement;
    if (isDarkMode) htmlEl.classList.add("dark-mode");
    else htmlEl.classList.remove("dark-mode");
  }, [isDarkMode]);

  function handleToggle() {
    setIsDarkMode((dark) => !dark);
  }
  return <DarkModeContext.Provider value={{ isDarkMode, handleToggle }}>{children}</DarkModeContext.Provider>;
}

export function useDarkMode() {
  const { isDarkMode, handleToggle } = useContext(DarkModeContext);

  console.log(isDarkMode);
  return { isDarkMode, handleToggle };
}
