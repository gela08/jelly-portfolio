import { useState, useEffect } from "react";
import "../styles/ThemeToggle.css";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div
      className="toggle-outer"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <div className={`toggle-track ${theme}`}>
        <div className={`toggle-thumb ${theme}`}>
          <div className="sun-rays"></div>
          <div className="moon-crater crater-1"></div>
          <div className="moon-crater crater-2"></div>
          <div className="moon-crater crater-3"></div>
        </div>
      </div>
    </div>
  );
}
