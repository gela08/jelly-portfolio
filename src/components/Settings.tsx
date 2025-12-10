import { useState } from "react";
import "../styles/Settings.css";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChangeTheme: (theme: string) => void;
  onChangeFontSize: (size: string) => void;
  onChangeColor: (color: string) => void;
}

const COLORS = ["blue", "gold", "hotpink", "mediumpurple", "darkorange", "mediumseagreen"];

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onChangeTheme,
  onChangeFontSize,
  onChangeColor,
}) => {
  const [activeColor, setActiveColor] = useState("blue");
  const [activeTheme, setActiveTheme] = useState("default");
  const [fontSize, setFontSize] = useState("16");
  const [useSystem, setUseSystem] = useState(false);

  if (!isOpen) return null;

  const handleTheme = (theme: string) => {
    setActiveTheme(theme);
    setUseSystem(false);
    onChangeTheme(theme);
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>

        <h2>Font size</h2>
        <div className="font-row">
          <span>Aa</span>
          <input
            type="range"
            min="12"
            max="24"
            value={fontSize}
            onChange={(e) => {
              setFontSize(e.target.value);
              onChangeFontSize(e.target.value);
            }}
          />
          <span className="big">Aa</span>
        </div>

        <h2>Color</h2>
        <div className="color-row">
          {COLORS.map((c) => (
            <button
              key={c}
              className={`color-dot ${activeColor === c ? "active" : ""}`}
              style={{ backgroundColor: c }}
              onClick={() => {
                setActiveColor(c);
                onChangeColor(c);
              }}
            >
              {activeColor === c && "✓"}
            </button>
          ))}
        </div>

        <h2>Background</h2>
        <div className="theme-row">
          <button className={activeTheme === "default" ? "theme-btn active" : "theme-btn"} onClick={() => handleTheme("default")}>
            Default
          </button>

          <button className={activeTheme === "dim" ? "theme-btn active" : "theme-btn"} onClick={() => handleTheme("dim")}>
            Light
          </button>

          <button className={activeTheme === "lights-out" ? "theme-btn active" : "theme-btn"} onClick={() => handleTheme("lights-out")}>
            Dark
          </button>
        </div>

        <div className="system-row">
          <div>
            <strong>Use system setting</strong>
            <p>Your theme will automatically switch based on your device settings</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={useSystem}
              onChange={(e) => {
                setUseSystem(e.target.checked);
                onChangeTheme(e.target.checked ? "system" : "default");
              }}
            />
            <span className="slider"></span>
          </label>
        </div>

      </div>
    </div>
  );
};

export default SettingsModal;
