import "../styles/pages/Journal.css";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    observations: "They focus on helping startups, in finances, and business management. They presented us some programs about student innovation mentorship and the different startups with the reason why startups need help. They helped lots of startups ever since, making them successful. They gave us tips for thesis and taught us how they help startups.",
    learnings: "I learned that businesses doesn't go famous right after making it. Sometimes or most of the time, business startups need help from business-minded mentors such as this UP Business Incubator. Some business-minded people start their business with no or less knowledge but with the help of programs and trainings, it fuels their drive to continue in making their business.",
  },
  {
    journimage: "/journal/dynata.png",
    image: "/journal/DYNATAPH.png",
    title: "DYNATA PHILIPPINES INC.",
    subtitle: "Cebu Tour",
    facilitator: "Sir Anton Diego H. Lim and Miss Valerie Liston",
    observations: "They discussed about laws about safety and health. I observed also that the company does not only cover the Philippines but also in the US, they handle surveys for companies there. Their office is aware with the health and safety protocols. They care for the well-being, the disciplinary trainings/programs for their employees, and still include some social events for the workers to communicate and talk to each other to have fun. They focus also on career growth and development.",
    learnings: "I learned about the office environments, health, and safety, and the different hazards that can occur in the office. Dynata provides marketing surveys and political surveys in the US. They have different clients from all over the Philippines and in the US. They have Market Research, Consumer Products & Services, Media, Universities, and even the Government.",
  },
  {
    journimage: "/journal/rivan.png",
    image: "/journal/RivanIT.png",
    title: "RIVAN IT CEBU",
    subtitle: "Cebu Tour",
    facilitator: "Sir Kevin Lu",
    observations: "They focused on where to find jobs and taught us some tips in order to be accepted from the job. Focused more on the much more higher salary. Most of the jobs with higher salary that needs certain certifications that we looked up from a job site online. The much more focus of the company is more on networking and even networking related jobs.",
    learnings: "I learned that you need specific requirements certifications such as ccna, ccnp, sap, and other certain certifications in order to apply for a job. I also learned that everything can be looked up in youtube about everything you need to learn about a certain job. The most successful person can succeed if they knew how to take notes. Make learning fun, watch youtube, and always take notes not for your parents, for friends but for you. I also learned about some cli commands in telephones, how to communicate with the other telephone but with some fxs but different ports.",
  },
  {
    journimage: "/journal/mata.png",
    image: "/journal/MataTech.png",
    title: "MATA TECHNOLOGIES, INC.",
    subtitle: "Cebu Tour",
    facilitator: "Miss Suzzette Minero, Sir Snow, and Sir Jeff Yongco",
    observations: "They are a diverse company and has partnerships not just in the Philippines but also all over the globe. They are a company that makes websites for real estate but clients also entrust them with a different type of websites. They create their websites by code and they have virtual reality website.",
    learnings: "I learned that technology can be scary and useful at the same time. It can be useful even when going to destinations, it can help save some time although there might be a big impact on tour guides. Despite that it helps tourist save some time and effort and even their money. Overall, their company is making useful applications and it's impressive that they manually create it.",
  },
  {
    journimage: "/journal/tarsier.png",
    image: "/journal/T.a.R.S.I.E.R 117.png",
    title: "T.a.R.S.I.E.R 117",
    subtitle: "Bohol Tour",
    facilitator: "Emergency Response Division Team",
    observations: "I observed that bohol does not only have filipino citizens but also thousands of tourists all over the world. Tarsier was created to help with emergency transport to those people who don't have the capacity to find an emergency transport. They have 3 divisions to prepare for the worst/disaster strikes. they have different substations, can respond to any emergency, and has emergency preparedness. They have over 108 cameras all over bohol.",
    learnings: "I learned that having lots of municipality with at least 2 or more ambulance can save lives. Having volunteers that helps in emergencies can help in the community. Emergency Responders risk their lives, find ways to prepare and respond, and is a very important part of the community in case of emergencies/calamities. There's nothing wrong with being prepared but it helps reduce our risk of being in a situation where we cannot stand up again.",
  },
];

export default function Journal() {
  const [activeJournal, setActiveJournal] = useState<Journal | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const lastY = useRef(0);
  const dragging = useRef(false);

  useEffect(() => {
    if (activeJournal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeJournal]);

  const dragStart = (e: React.TouchEvent | React.MouseEvent) => {
    dragging.current = true;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    startY.current = clientY;
    lastY.current = clientY;
    if (modalRef.current) modalRef.current.style.transition = "none";
  };

  const dragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!dragging.current || !modalRef.current) return;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const delta = clientY - startY.current;
    if (delta < 0) return;
    lastY.current = clientY;
    modalRef.current.style.transform = `translateY(${delta}px)`;
  };

  const dragEnd = () => {
    dragging.current = false;
    if (!modalRef.current) return;
    const totalDrag = lastY.current - startY.current;

    if (totalDrag > 140) {
      modalRef.current.style.transition = "transform 0.3s ease-out";
      modalRef.current.style.transform = "translateY(100vh)";
      setTimeout(() => setActiveJournal(null), 200);
    } else {
      modalRef.current.style.transition = "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)";
      modalRef.current.style.transform = "translateY(0)";
    }
  };

  return (
    <section id="journal" className="journal-section">
      <h2 className="journal-title">Journal</h2>
      <p className="journal-subtitle">
        A visual record of learning moments, industry experiences, and academic excursions.
      </p>

      <div className="journal-grid">
        {journalData.map((item, i) => (
          <motion.article
            key={i}
            className="journal-card"
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setActiveJournal(item)}
          >
            <img src={item.journimage} alt={item.title} loading="lazy" />
            <div className="journal-card-content">
              <h3>{item.title}</h3>
              <span>{item.subtitle}</span>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {activeJournal && (
          <motion.div
            className="journ-modal-overlay show"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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

              <div className="journ-modal-image-panel">
                <img
                  src={activeJournal.image}
                  alt={activeJournal.title}
                  className="journal-modal-image"
                />
              </div>

              <div className="journ-modal-content">
                <div className="journ-modal-header">
                <span className="subtitle-tag">{activeJournal.subtitle}</span>
                <h3>{activeJournal.title}</h3>
                {activeJournal.facilitator && (
                  <p className="facilitator-text">
                    Facilitator: <span>{activeJournal.facilitator}</span>
                  </p>
                )}
                </div>

                <div className="content-scroller">
                  <div className="info-block">
                    <h4 className="block-label">Observations</h4>
                    <p className="description">{activeJournal.observations}</p>
                  </div>

                  <div className="info-block">
                    <h4 className="block-label">Learnings</h4>
                    <p className="description">{activeJournal.learnings}</p>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}