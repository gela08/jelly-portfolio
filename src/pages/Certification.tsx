import "../styles/pages/Certification.css";
import { useState, useRef, useEffect } from "react";

type Cert = {
  title: string;
  issuer: string;
  year: string;
  image: string;
  description: string;
};

const certificationData: Cert[] = [
  {
    title: "Introduction to C++ Programming Certificate",
    issuer: "SkillUp",
    year: "2025",
    image: "/certificates/cpp2025.png",
    description:
      "Certificate of Completion for completing an online programming course. Thank you, SkillUp!",
  },
  {
    title: "Educational Tour (Cebu-Bohol) Certificate",
    issuer: "World of Adventures Travel and Tours",
    year: "2025",
    image: "/certificates/watt2025.png",
    description:
      "Certificate of Completion after we finished touring with WATT. It was a really fun and unforgettable journey! We had a really cool and amazing tour guide who knows it all from cebu all the way to bohol. Thank you, WATT team! Kani siya diri is gi reclaim ni siya since WATT sign!!",
  },
  {
    title: "National Service Training Program Certificate",
    issuer: "NSTP - CWTS",
    year: "2025",
    image: "/certificates/nstp2025.png",
    description:
      "Certificate of Completion from our NSTP subject. Had a fun adventure during our Sasa Port visit and a graduation for completing the subject. Thank you to our NSTP teachers, and goodbye, NSTP subject!",
  },
  {
    title: "Codechum Certificate",
    issuer: "CC105 - Information Management",
    year: "2025",
    image: "/certificates/codechum2025.png",
    description:
      "Certificate of Completion from Codechum after answering all the activities from the class. Had a stressful time answering some questions, but it was really fun enhancing my programming skills—and also my cramming skills before the deadlines. The site had a lot of crashes and bugs; I hope they were able to fix them. Still got a good score there, btw. Thank you, Codechum!",
  },
  {
    title: "PANAGSANKA2025 Certificate",
    issuer: "Physical Education",
    year: "2025",
    image: "/certificates/pe2025.png",
    description:
      "Certificate of Recognition from our PE event. Got the chance to be one of the leaders; received stress but it paid off with my volleyball girls team (Champion). It was a really fun experience and I got to use my leadership skills. It was the biggest event I’ve handled so far (almost 900 students?), and it paid off for me and my classmates since all of us got 100% grades. Thank you to our PE teachers, and goodbye, PE subject!",
  },
  {
    title: "TEAM SUNG JE ROM Champion Certificate",
    issuer: "CET TechnoFair - IT Programming Contest",
    year: "2025",
    image: "/certificates/champ2025.png",
    description:
      "Certificate of Recognition from CET TechnoFair, 2nd time champion after the 2024 programming competition. Different teammates this time since one of my previous teammates wasn’t allowed to compete, and I was the only one available that day. I didn’t actually help much (sorry, guys!), but the event was upgraded and they gave us snacks during the competition. Overall, I was just happy to be there and give moral support to my team. Thank you, TEAM SUNG JE ROM! Fun fact: the team name is named after a legend — Jerome Sagunday.",
  },
  {
    title: "Second Honor Certificate",
    issuer: "Dean's Lister",
    year: "2025",
    image: "/certificates/dl2025.png",
    description:
      "Excellent Academic Proficiency Certificate during the 1st Semester of 2024–2025 as a 2nd year BSIT student. This award was unexpected since I was only third honor during the 1st semester of 2023–2024. Didn’t expect to reach this level, but still very grateful!",
  },
  {
    title: "TEAM TERNARY Champion Certificate",
    issuer: "CET TechnoFair - Programming Competition (IT Category)",
    year: "2024",
    image: "/certificates/champ2024.png",
    description:
      "Certificate of Recognition from CET TechnoFair. First time joining a contest and we won the title as champions!! It was a really cool experience—I didn’t know what the problems would be, but I’m thankful for my OG team!! LEZZGOOO!! They were the brains of the team who dealt with the logic of the competition. My role was to understand, take notes, and support them while they figured out how to solve the problems. I wasn’t able to contribute much, but they still hyped me up and included me until we got our awards. Thank you, TEAM TERNARY!",
  },
  {
    title: "Third Honor Certificate",
    issuer: "Dean's Lister",
    year: "2024",
    image: "/certificates/dl2024.png",
    description:
      "Excellent Academic Proficiency Certificate during the 1st Semester of 2023–2024 as a 1st year BSIT student. This award came very unexpectedly since it was my first year in college—figuring things out with a new level of knowledge and serious adult stuff. I didn’t even know colleges had this kind of recognition, so I didn’t expect any reward since I thought my grades were meh. Still grateful as always for receiving this award.",
  },
  {
    title: "JavaScript Basics Certificate",
    issuer: "BitDegree",
    year: "2023",
    image: "/certificates/js2023.png",
    description:
      "Certificate of Completion from BitDegree. This certificate was required by our subject, and all of us were required to have it as a ticket for our grades. It was my first-ever certificate in college. I got to know the basics of JavaScript and was able to use them in some of our subject projects at that time. Thank you, BitDegree!",
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

  useEffect(() => {
  if (activeCert) {
    // Lock background scroll
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
  } else {
    // Restore scroll
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
  }

  // Cleanup (important)
  return () => {
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
  };
}, [activeCert]);


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
            <div className="cert-modal-handle" />

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