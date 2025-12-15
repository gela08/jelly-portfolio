import "../styles/pages/Certification.css";
import { useState } from "react";

type Cert = {
  title: string;
  issuer: string;
  year: string;
  image: string;
  description: string;
};

const certificationData: Cert[] = [
  {
    title: "Information Management",
    issuer: "CodeChum",
    year: "2025",
    image: "/certificates/codechum.png",
    description:
      "Completed Information Management course focusing on database concepts, normalization, and data handling.",
  },
  {
    title: "JavaScript Basics",
    issuer: "BitDegree",
    year: "2024",
    image: "/certificates/bitdegree-js.png",
    description:
      "JavaScript fundamentals including variables, functions, loops, and DOM basics.",
  },
  {
    title: "C++ Programming",
    issuer: "SkillUp",
    year: "2023",
    image: "/certificates/cpp.png",
    description:
      "Introductory C++ programming covering syntax, logic, and problem solving.",
  },
];

export default function Certification() {
  const [hover, setHover] = useState({
    show: false,
    x: 0,
    y: 0,
    image: "",
  });

  const [activeCert, setActiveCert] = useState<Cert | null>(null);

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
            className="cert-card"
            onMouseEnter={(e) =>
              setHover({
                show: true,
                x: e.clientX,
                y: e.clientY,
                image: cert.image,
              })
            }
            onMouseMove={(e) =>
              setHover((prev) => ({
                ...prev,
                x: e.clientX,
                y: e.clientY,
              }))
            }
            onMouseLeave={() =>
              setHover((prev) => ({ ...prev, show: false }))
            }
            onClick={() => setActiveCert(cert)}
          >
            <h3>{cert.title}</h3>
            <p className="cert-issuer">{cert.issuer}</p>
            <span className="cert-year">{cert.year}</span>
          </div>
        ))}
      </div>

      {/* Hover Preview */}
      <div
        className={`cert-hover ${hover.show ? "show" : ""}`}
        style={{
          top: Math.min(hover.y + 24, window.innerHeight - 220),
          left: Math.min(hover.x + 24, window.innerWidth - 320),
        }}
      >
        <img src={hover.image} alt="" />
      </div>

      {/* Modal */}
      {activeCert && (
        <div className="cert-modal-overlay" onClick={() => setActiveCert(null)}>
          <div
            className="cert-modal"
            onClick={(e) => e.stopPropagation()}
          >
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
