import "../styles/pages/Journal.css";
import { useState, useRef, useEffect } from "react";


type Journal = {
    journimage: string;
    image: string;
    title: string;
    subtitle: string;
    facilitator: string;
    observations: string;
    learnings: string;
};

const journalData: Journal[] = [
    {
        journimage: "/journal/up.png",
        image: "/journal/UPIT.png",
        title: "UP BUSINESS INCUBATOR FOR IT",
        subtitle: "Cebu Tour",
        facilitator: "Sir Jason Nieva",
        observations:
            //   "Visited IT infrastructures and observed real-world systems used in professional environments. This experience helped bridge classroom learning with industry practice.",
            "They focus on helping startups, in finances, and business management. They presented us some programs about student innovation mentorship and the different startups with the reason why startups need help. They helped lots of startups ever since, making them successful. They gave us tips for thesis and taught us hopw they help startups.",
        learnings:
            "I learned that businesses doesn't go famous right after making it. Somtimes or most of the time, business startups need help from business-minded mentors such as this UP Business Incubator. Some business-minded people start their business with no or less knowledge but with the help of programs and trainings, it fuels their drive to continue in making their business.",
    },
    {
        journimage: "/journal/dynata.png",
        image: "/journal/DYNATAPH.png",
        title: "DYNATA PHILIPPINES INC.",
        subtitle: "Cebu Tour",
        facilitator: "Sir Anton Diego H. Lim and Miss Valerie Liston",
        observations:
            //   "Visited IT infrastructures and observed real-world systems used in professional environments. This experience helped bridge classroom learning with industry practice.",
            "They discussed about laws about safety and health. I observed also that the company does not only cover the Philippines but also in the US, they handle surveys for companies there. Their office is aware with the health and safety protocols. They care for the well-being, the disciplinary trainings/programs for their employees, and still include some social events for the workers to communicate and talk to each other to have fun. They focus also on career growth and development.",
        learnings:
            "I learned about the office environments, health, and safety, and the different haxards that can occur in the office. Dynata provides marketing surveys and political surveys in the US. They have different clients from all over the Philippines and in the US. They have Market Research, Consumer Products & Services, Media, Universities, and even the Government.",
    },
    {
        journimage: "/journal/rivan.png",
        image: "/journal/RivanIT.png",
        title: "RIVAN IT CEBU",
        subtitle: "Cebu Tour",
        facilitator: "Sir Kevin Lu",
        // info:
        //     
        observations:
            //   "Participated in guided explanations and hands-on observations that deepened our understanding of IT workflows.",
            "They focused on where to find jobs and taught us some tips in order to be accepted from the job. Focused more on the much more higher salary. Most of the jobs with higher salary that needs certain ceritications that we looked up from a job site online. The much more focus of the compan is more on networking and even networking related jobs.",
        learnings:
            "I learned that you need specific requirements certifications such as ccna, ccnp, sap, and other certain certifications in order to apply for a job. I also learned that everything can be looked up in youtube about everything you need to learn about a certain job. The most successful person can succeed if they knew how to take notes. Make learning fun, watch youtube, and always take notes not for your parents, for friends but for you. I also learned about som cli commands in telephones, how to communicate with the other telephone but with some fxs but different ports.",
    },
    {
        journimage: "/journal/mata.png",
        image: "/journal/MataTech.png",
        title: "MATA TECHONOLOGIES, INC.",
        subtitle: "Cebu Tour",
        facilitator: "Miss Suzzette Minero, Sir Snow, and Sir Jeff Yongco",
        observations:
            //   "Visited IT infrastructures and observed real-world systems used in professional environments. This experience helped bridge classroom learning with industry practice.",
            "They are a diverse company and has pertnerships not just in the Philippines but also all over the globe. They are a company that makes websites for real estate but clients also entrust them with a different type of websites. They create their websites by code and they have virtual reality website.",
        learnings:
            "I learned that technology can be scary and useful at the same time. It can be useful even when going to destinations, it can help save some time although there might be a big impact on tour guides. Despite that it helps tourist save some time and effort and even their money. Overall, their company is making useful applications and it's impressive that they manually create it.",
    },
    {
        journimage: "/journal/tarsier.png",
        image: "/journal/T.a.R.S.I.E.R 117.png",
        title: "T.a.R.S.I.E.R 117",
        subtitle: "Bohol Tour",
        facilitator: "",
        observations:
        //   "A memorable group photo with my classmates. This tour strengthened friendships and teamwork beyond the classroom.",
            "I observed that bohol does not only have filipino citizens but also thousands of tourists all over the world. Tarsier was created ti help with emergency transport to those people who don't have the capacity to find a emergency transport. They have 3 devisions to prepare for the worst/disaster strikes. they have different substations, can respond to any emergency, and has emergency preparedness. They have over 108 cameras all over bohol.",
        learnings:
            "I learned that having lots of municipality with at least 2 or more ambulance can save lives. Having volunteers that helps in emergencies can help in the community. Emergency Responders risk their lives, fin ways to prepare and respond, and is a very important part of the community in case of emergencies/calamities. There's nothing wrong with being prepared but it helps reduce our risk of being in a situation where we cannot stand up again.",
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

    useEffect(() => {
  if (activeJournal) {
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
}, [activeJournal]);


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
                        <img src={item.journimage} alt={item.title} />
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
                    className="journ-modal-overlay show"
                    onClick={() => setActiveJournal(null)}
                >
                    <div
                        ref={modalRef}
                        className="journ-modal"
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



                        <div className="journ-modal-content">
                            <h3>{activeJournal.title}</h3>
                            <span className="year">{activeJournal.facilitator}</span>
                            
                            <p className="oble">Observations:</p>
                            <p className="description">{activeJournal.observations}</p>

                            <p className="oble">Learnings:</p>
                            <p className="description">{activeJournal.learnings}</p>
                        </div>
                        
                    </div>
                </div>
            )}
        </section>
    );
}
