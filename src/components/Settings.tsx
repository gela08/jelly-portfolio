import { useState, useRef } from "react";
import "../styles/components/Settings.css";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChangeTheme: (theme: string) => void;
  onChangeColor: (color: string) => void;
}

const COLORS = ["blue", "purple",  "red", "#FF007F", "#FF5B00", "green"];

export default function SettingsModal({
  isOpen,
  onClose,
  onChangeTheme,
  onChangeColor
}: SettingsModalProps) {

  const [activeColor, setActiveColor] = useState("blue");
  const [activeTheme, setActiveTheme] = useState("default");
  const [useSystem, setUseSystem] = useState(false);

  // DRAG PHYSICS
  const modalRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const lastY = useRef(0);
  const lastTime = useRef(0);
  const velocity = useRef(0);
  const dragging = useRef(false);

  const MIN_CLOSE_DRAG = 120;
  const VELOCITY_CLOSE_THRESHOLD = 1.2; // fast swipe = close

  const dragStart = (e: React.TouchEvent | React.MouseEvent) => {
    dragging.current = true;

    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    startY.current = clientY;
    lastY.current = clientY;
    lastTime.current = performance.now();

    if (modalRef.current) {
      modalRef.current.style.transition = "none";
    }
  };

  const dragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!dragging.current || !modalRef.current) return;

    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const delta = clientY - startY.current;

    if (delta < 0) return; // cannot drag upward

    currentY.current = delta;

    // Compute velocity
    const now = performance.now();
    const dy = clientY - lastY.current;
    const dt = now - lastTime.current;
    velocity.current = dy / dt; // px per ms

    lastY.current = clientY;
    lastTime.current = now;

    // Rubber-band stretch when dragging long distances
    let dragAmount = delta;
    if (delta > 180) {
      dragAmount = 180 + (delta - 180) * 0.25;
    }

    modalRef.current.style.transform = `translateY(${dragAmount}px)`;
  };

  const dragEnd = () => {
    dragging.current = false;

    if (!modalRef.current) return;

    const fastSwipe = velocity.current > VELOCITY_CLOSE_THRESHOLD;
    const longDrag = currentY.current > MIN_CLOSE_DRAG;

    if (fastSwipe || longDrag) {
      // CLOSE SHEET
      modalRef.current.style.transition = "0.35s cubic-bezier(.33,1.07,.53,1.29)";
      modalRef.current.style.transform = "translateY(100vh)";
      setTimeout(onClose, 250);
    } else {
      // BOUNCE BACK (spring)
      modalRef.current.style.transition = "0.4s cubic-bezier(.2,1.15,.45,1.35)";
      modalRef.current.style.transform = "translateY(0)";
    }

    currentY.current = 0;
    velocity.current = 0;
  };

  if (!isOpen) return null;

  const handleTheme = (theme: string) => {
    setActiveTheme(theme);
    setUseSystem(false);
    onChangeTheme(theme);
  };

  return (
    <div className="settings-overlay show" onClick={onClose}>
      <div
        ref={modalRef}
        className="settings-modal upgraded draggable"
        onClick={(e) => e.stopPropagation()}

        onMouseDown={dragStart}
        onMouseMove={dragMove}
        onMouseUp={dragEnd}
        onMouseLeave={dragEnd}

        onTouchStart={dragStart}
        onTouchMove={dragMove}
        onTouchEnd={dragEnd}
      >
        <div className="settings-handle"></div>

        <button className="settings-close-btn" onClick={onClose}>×</button>
        <h1 className="settings-title">Settings</h1>

        <h2>Color</h2>
        <div className="color-row">
          {COLORS.map((c) => (

            <button
              key={c}
              className={`color-dot ${activeColor === c ? "active" : ""}`}
              style={{ backgroundColor: c, color: c }}   // <<< ADD color: c
              onClick={() => {
                setActiveColor(c);
                onChangeColor(c);
              }}
            ></button>


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
}
