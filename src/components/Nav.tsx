import { useState, useEffect, useRef } from "react";
import SettingsModal from "./Settings";
import "../styles/Nav.css";

export default function Nav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const aboutRef = useRef<HTMLLIElement | null>(null);

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
  const toggleModal = () => setIsModalOpen(prev => !prev);

  // ✅ THEME HANDLER (DIM = LIGHT, LIGHTS-OUT = DARK)
  const handleChangeTheme = (theme: string) => {
    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.setAttribute(
        "data-theme",
        prefersDark ? "dark" : "light"
      );
      return;
    }

    if (theme === "dim") {
      document.documentElement.setAttribute("data-theme", "light");
      return;
    }

    if (theme === "lights-out") {
      document.documentElement.setAttribute("data-theme", "dark");
      return;
    }

    document.documentElement.setAttribute("data-theme", theme);
  };

  // ✅ FONT SIZE
  const handleChangeFontSize = (size: string) => {
    document.documentElement.style.fontSize = `${size}px`;
  };

  // ✅ ACCENT COLOR
  const handleChangeColor = (color: string) => {
    document.documentElement.style.setProperty("--accent", color);
  };

  // ✅ CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        aboutRef.current &&
        !aboutRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="brand" href="#home">jelly</a>

        <ul className="nav-links">
          <li><a href="#home">Home</a></li>

          <li ref={aboutRef} className={`about ${isDropdownOpen ? "open" : ""}`}>
            <a href="#about" onClick={toggleDropdown}>About</a>
            <ul ref={dropdownRef} className="dropdown">
              <li><a href="#skills" onClick={() => setIsDropdownOpen(false)}>Skills</a></li>
              <li><a href="#education" onClick={() => setIsDropdownOpen(false)}>Education</a></li>
              <li><a href="#certification" onClick={() => setIsDropdownOpen(false)}>Certification</a></li>
              <li><a href="#work" onClick={() => setIsDropdownOpen(false)}>Work</a></li>
              <li><a href="#experience" onClick={() => setIsDropdownOpen(false)}>Experience</a></li>
              <li><a href="#journal" onClick={() => setIsDropdownOpen(false)}>Journal</a></li>
              <li><a href="#gallery" onClick={() => setIsDropdownOpen(false)}>Gallery</a></li>
            </ul>
          </li>

          <li><a href="#contact">Contact</a></li>
        </ul>

        {/* ✅ SETTINGS BUTTON */}
        <button className="settings-icon" onClick={toggleModal}>⚙️</button>
      </div>

      {/* ✅ SETTINGS MODAL */}
      <SettingsModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        onChangeTheme={handleChangeTheme}
        onChangeFontSize={handleChangeFontSize}
        onChangeColor={handleChangeColor}
      />
    </nav>
  );
}
