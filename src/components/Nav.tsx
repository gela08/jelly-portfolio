import { useState, useEffect } from "react";
import SettingsModal from "./Settings";
import "../styles/components/Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  // Theme handlers aligned directly to your global dataset attributes
  const handleChangeTheme = (theme: string) => {
    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
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

  const handleChangeColor = (color: string) => {
    document.documentElement.style.setProperty("--accent", color);
  };

  // Shadow indicator on scroll
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector(".nav");
      if (window.scrollY > 10) nav?.classList.add("scrolled");
      else nav?.classList.remove("scrolled");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock background scroll when mobile sidebar layout is drawn
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  const renderLinks = (closeMobileMenu = false) => {
    const onClickHandler = closeMobileMenu ? () => setIsMobileMenuOpen(false) : undefined;
    const links = [
      { hash: "#home", label: "Home" },
      { hash: "#about", label: "About" },
      { hash: "#contact", label: "Contact" },
    ];

    return links.map((link) => (
      <li key={link.hash} onClick={onClickHandler}>
        {isHome ? (
          <a href={link.hash}>{link.label}</a>
        ) : (
          <Link to={`/${link.hash}`}>{link.label}</Link>
        )}
      </li>
    ));
  };

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link className="brand" to="/" onClick={() => setIsMobileMenuOpen(false)}>
            jelly
          </Link>

          {/* Desktop Anchor Options */}
          <ul className="nav-links">
            {renderLinks()}
          </ul>

          {/* Utility Layout Controls */}
          <div className="nav-actions">
            <button className="settings-icon" onClick={toggleModal} aria-label="Settings">
              <FontAwesomeIcon icon={faGear} />
            </button>

            {/* Hamburger Activation Button */}
            <button
              className={`hamburger ${isMobileMenuOpen ? "open" : ""}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <div className={`mobile-sidebar ${isMobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-sidebar-header">
            <span className="mobile-brand">jelly</span>
            <button className="close-sidebar" onClick={() => setIsMobileMenuOpen(false)}>
              &times;
            </button>
          </div>

          <ul className="mobile-nav">
            {renderLinks(true)}
          </ul>
        </div>

        {/* Dynamic Theme Backdrop Blur Overlay */}
        <div 
          className={`sidebar-overlay ${isMobileMenuOpen ? "show" : ""}`} 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      </nav>

      {/* Embedded Application Preferences Modal Component */}
      <SettingsModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        onChangeTheme={handleChangeTheme}
        onChangeColor={handleChangeColor}
      />
    </>
  );
}