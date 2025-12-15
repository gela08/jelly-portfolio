import "../styles/pages/Certification.css";
import { useState, useRef } from "react";

type Cert = {
  title: string;
  issuer: string;
  year: string;
  image: string;
  description: string;
};

const certificationData: Cert[] = [
  {
    title: "Introduction to C++ Programming",
    issuer: "SkillUp",
    year: "2025",
    image: "/certificates/cpp2025.png",
    description:
      "Introductory C++ programming covering syntax, logic, and problem solving.",
  },
  {
    title: "Educational Tour (Cebu-Bohol)",
    issuer: "World of Adventures Travel and Tours",
    year: "2025",
    image: "/certificates/watt2025.png",
    description: "",
  },
  {
    title: "National Service Training Program",
    issuer: "NSTP - CWTS",
    year: "2025",
    image: "/certificates/nstp2025.png",
    description: "",
  },
  {
    title: "Codechum",
    issuer: "CC105 - Information Management",
    year: "2025",
    image: "/certificates/codechum2025.png",
    description: "TBA",
  },
  {
    title: "PANAGSANKA2025 - Certificate of Recognition",
    issuer: "Physical Education",
    year: "2025",
    image: "/certificates/pe2025.png",
    description: "TBA",
  },
  {
    title: "CET TechnoFair - IT Programming Contest",
    issuer: "TEAM SUNG JE ROM",
    year: "2025",
    image: "/certificates/champ2025.png",
    description: "TBA",
  },
  {
    title: "Academic Excellence Dean's Lister",
    issuer: "Third Honor",
    year: "2025",
    image: "/certificates/dl2025.png",
    description: "TBA",
  },
  {
    title: "CET TechnoFair - Programming Competition (IT Category)",
    issuer: "TEAM TERNARY",
    year: "2024",
    image: "/certificates/champ2024.png",
    description: "TBA",
  },
  {
    title: "Academic Excellence Dean's Lister",
    issuer: "Second Honor",
    year: "2024",
    image: "/certificates/dl2024.png",
    description: "TBA",
  },
  {
    title: "JavaScript Basics",
    issuer: "BitDegree",
    year: "2023",
    image: "/certificates/js2023.png",
    description:
      "JavaScript fundamentals including variables, functions, loops, and DOM basics.",
  },
];

/* -------------------- Desktop tilt -------------------- */

const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rx = ((y / rect.height) - 0.5) * -8;
  const ry = ((x / rect.width) - 0.5) * 8;

  card.style.setProperty("--rx", `${rx}deg`);
  card.style.setProperty("--ry", `${ry}deg`);
};

const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
  const card = e.currentTarget;
  card.style.setProperty("--rx", "0deg");
  card.style.setProperty("--ry", "0deg");
};

export default function Certification() {
  const [activeCert, setActiveCert] = useState<Cert | null>(null);

  /* -------------------- modal drag (Settings-style) -------------------- */

  const modalRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const lastY = useRef(0);
  const lastTime = useRef(0);
  const velocity = useRef(0);
  const dragging = useRef(false);

  const MIN_CLOSE_DRAG = 120;
  const VELOCITY_CLOSE_THRESHOLD = 1.2;

  const dragStart = (e: React.TouchEvent | React.MouseEvent) => {
    dragging.current = true;
    const y = "touches" in e ? e.touches[0].clientY : e.clientY;

    startY.current = y;
    lastY.current = y;
    lastTime.current = performance.now();

    if (modalRef.current) {
      modalRef.current.style.transition = "none";
    }
  };

  const dragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!dragging.current || !modalRef.current) return;

    const y = "touches" in e ? e.touches[0].clientY : e.clientY;
    const delta = y - startY.current;
    if (delta < 0) return;

    const now = performance.now();
    velocity.current = (y - lastY.current) / (now - lastTime.current);

    lastY.current = y;
    lastTime.current = now;

    modalRef.current.style.transform = `translateY(${delta}px)`;
  };

  const dragEnd = () => {
    dragging.current = false;
    if (!modalRef.current) return;

    const fast = velocity.current > VELOCITY_CLOSE_THRESHOLD;
    const far = lastY.current - startY.current > MIN_CLOSE_DRAG;

    if (fast || far) {
      modalRef.current.style.transition =
        "0.35s cubic-bezier(.33,1.07,.53,1.29)";
      modalRef.current.style.transform = "translateY(100vh)";
      setTimeout(() => setActiveCert(null), 250);
    } else {
      modalRef.current.style.transition =
        "0.4s cubic-bezier(.2,1.15,.45,1.35)";
      modalRef.current.style.transform = "translateY(0)";
    }
  };

  /* -------------------- mobile hold logic -------------------- */

  const holdTimer = useRef<number | null>(null);
  const isHolding = useRef(false);
  const [heldCard, setHeldCard] = useState<number | null>(null);

  const isMobile = () =>
    window.matchMedia("(max-width: 768px)").matches;

  const handleTouchStart = (index: number) => {
    isHolding.current = false;

    holdTimer.current = window.setTimeout(() => {
      isHolding.current = true;
      setHeldCard(index);
      navigator.vibrate?.(8);
    }, 300);
  };

  const handleTouchEnd = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }

    setTimeout(() => setHeldCard(null), 350);
  };

  return (
    <section id="certification" className="cert-section">
      <h2 className="section-title">Certifications</h2>
      <p className="section-subtitle">
        Courses, trainings, and certifications I have completed.
      </p>

      <div className="cert-grid">
        {certificationData.map((cert, index) => (
          <div
            key={index}
            className="cert-item"
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
            onTouchStart={() => handleTouchStart(index)}
            onTouchEnd={handleTouchEnd}
            onClick={() => {
              if (isMobile() && isHolding.current) return;
              setActiveCert(cert);
            }}
          >
            <div className={`cert-card ${heldCard === index ? "held" : ""}`}>
              <div className="cert-face cert-front">
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <span className="cert-year">{cert.year}</span>
              </div>

              <div className="cert-face cert-back">
                <img src={cert.image} alt={cert.title} />
              </div>

              <div className="cert-hint">
                <span></span>
                <span></span>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* -------------------- Modal -------------------- */}

        
      {activeCert && (
        <div
          className="cert-modal-overlay show"
          onClick={() => setActiveCert(null)}
        >
          <div
            ref={modalRef}
            className="cert-modal"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={dragStart}
            onMouseMove={dragMove}
            onMouseUp={dragEnd}
            onMouseLeave={dragEnd}
            onTouchStart={dragStart}
            onTouchMove={dragMove}
            onTouchEnd={dragEnd}
          >
            <div className="modal-handle" />

            <img
              src={activeCert.image}
              alt={activeCert.title}
              className="cert-modal-image"
            />

            <div className="cert-modal-content">
              <h3>{activeCert.title}</h3>
              <p className="issuer">{activeCert.issuer}</p>
              <span className="year">{activeCert.year}</span>
              <p className="description">{activeCert.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
