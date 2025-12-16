import "../styles/pages/Journal.css";
import { useState, useRef } from "react";

type Journal = {
    image: string;
    title: string;
    subtitle: string;
    info: string;
};

const journalData: Journal[] = [
    {
        image: "/journal/UPIT.png",
        title: "UP BUSINESS INCUBATOR FOR IT",
        subtitle: "Cebu Tour",
        info:
            //   "Visited IT infrastructures and observed real-world systems used in professional environments. This experience helped bridge classroom learning with industry practice.",
            "",
    },
    {
        image: "/journal/DYNATAPH.png",
        title: "DYNATA PHILIPPINES INC.",
        subtitle: "Cebu Tour",
        info:
            //   "A memorable group photo with my classmates. This tour strengthened friendships and teamwork beyond the classroom.",
            "",
    },
    {
        image: "/journal/RivanIT.png",
        title: "RIVAN IT CEBU",
        subtitle: "Cebu Tour",
        info:
            //   "Participated in guided explanations and hands-on observations that deepened our understanding of IT workflows.",
            "",
    },
    {
        image: "/journal/MataTech.png",
        title: "MATA TECHONOLOGIES, INC.",
        subtitle: "Cebu Tour",
        info:
            //   "Visited IT infrastructures and observed real-world systems used in professional environments. This experience helped bridge classroom learning with industry practice.",
            "",
    },
    {
        image: "/journal/T.a.R.S.I.E.R 117.png",
        title: "T.a.R.S.I.E.R 117",
        subtitle: "Bohol Tour",
        info:
            //   "A memorable group photo with my classmates. This tour strengthened friendships and teamwork beyond the classroom.",
            "",
    },

];

export default function Journal() {
    const [activeJournal, setActiveJournal] = useState<Journal | null>(null);

    /* ---------- SAME MODAL DRAG LOGIC ---------- */

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

        if (modalRef.current) modalRef.current.style.transition = "none";
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
            setTimeout(() => setActiveJournal(null), 250);
        } else {
            modalRef.current.style.transition =
                "0.4s cubic-bezier(.2,1.15,.45,1.35)";
            modalRef.current.style.transform = "translateY(0)";
        }
    };

    return (
        <section id="journal" className="journal-section">
            <h2 className="journal-title">Journal</h2>
            <p className="journal-subtitle">
                A visual record of learning moments and experiences.
            </p>

            <div className="journal-grid">
                {journalData.map((item, i) => (
                    <article
                        key={i}
                        className="journal-card"
                        onClick={() => setActiveJournal(item)}
                    >
                        <img src={item.image} alt={item.title} />
                        <div className="journal-card-content">
                            <h3>{item.title}</h3>
                            <span>{item.subtitle}</span>
                        </div>
                    </article>
                ))}
            </div>

            {/* ---------- MODAL (SAME AS CERTIFICATION) ---------- */}

            {activeJournal && (
                <div
                    className="cert-modal-overlay show"
                    onClick={() => setActiveJournal(null)}
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
                            src={activeJournal.image}
                            alt={activeJournal.title}
                            className="journal-modal-image"
                        />



                        <div className="cert-modal-content">
                            <h3>{activeJournal.title}</h3>
                            <span className="year">{activeJournal.subtitle}</span>
                            <p className="description">{activeJournal.info}</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
