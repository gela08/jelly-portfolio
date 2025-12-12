import { useState, useEffect, useRef } from "react";
import SettingsModal from "./Settings";
import "../styles/components/Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const aboutRef = useRef<HTMLLIElement | null>(null);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  // Theme handler
  const handleChangeTheme = (theme: string) => {
    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)")
        .matches;
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

  // Accent Color
  const handleChangeColor = (color: string) => {
    document.documentElement.style.setProperty("--accent", color);
  };

  // Close dropdown when clicking outside
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

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector(".nav");
      if (window.scrollY > 10) nav?.classList.add("scrolled");
      else nav?.classList.remove("scrolled");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Disable body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="brand" href="#home">
          jelly
        </a>

        {/* Hamburger Icon */}
        <div
          className={`hamburger ${isMobileMenuOpen ? "open" : ""}`}
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Desktop Nav */}
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>

          <li ref={aboutRef} className={`about ${isDropdownOpen ? "open" : ""}`}>
            <a href="#about" onClick={toggleDropdown}>About</a>
            <ul ref={dropdownRef} className="dropdown">
              <li><a href="#skills">Skills</a></li>
              <li><a href="#education">Education</a></li>
              <li><a href="#certification">Certification</a></li>
              <li><a href="#work">Work</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#journal">Journal</a></li>
              <li><a href="#gallery">Gallery</a></li>
            </ul>
          </li>

          <li><a href="#contact">Contact</a></li>
        </ul>

        {/* Settings Icon */}
        <button className="settings-icon" onClick={toggleModal}>
          <FontAwesomeIcon icon={faGear} />
        </button>
      </div>

      {/* Dark overlay behind mobile menu */}
      <div
        className={`sidebar-overlay ${isMobileMenuOpen ? "show" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${isMobileMenuOpen ? "open" : ""}`}>
        <button className="close-sidebar" onClick={() => setIsMobileMenuOpen(false)}>
          ×
        </button>

        <a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
        <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
        <a href="#skills" onClick={() => setIsMobileMenuOpen(false)}>Skills</a>
        <a href="#education" onClick={() => setIsMobileMenuOpen(false)}>Education</a>
        <a href="#experience" onClick={() => setIsMobileMenuOpen(false)}>Experience</a>
        <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        onChangeTheme={handleChangeTheme}
        onChangeColor={handleChangeColor}
      />
    </nav>
  );
}
