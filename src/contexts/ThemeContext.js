import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // 테마 상태
  const [theme, setTheme] = useState("light");

  // 테마 변경 기능
  const toggleTheme = () => {
    // if (theme === "light") setTheme("dark");
    // else setTheme("light");
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (theme === "dark") {
      // 클래스에 태그 추가 (classList.add(""))
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
