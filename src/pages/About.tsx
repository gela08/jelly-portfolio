import { useEffect, useRef } from "react";
import "../styles/pages/About.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopCode, faPaintBrush, faMobileAlt, faBook, faArchive, faImagePortrait, faHandPaper, faGraduationCap, faCertificate, faBriefcase, faUserTie, faBookOpen, faImages } from "@fortawesome/free-solid-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons/faCode";

export default function About() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const cardsRe = useRef<(HTMLDivElement | null)[]>([]);


    useEffect(() => {
        const section = sectionRef.current;
        const cards = cardsRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        section?.classList.add("visible");

                        cards.forEach((card, index) => {
                            const randomOffset = Math.random() * 80; // organic stagger
                            setTimeout(() => {
                                card.classList.add("card-visible");
                            }, 150 * index + randomOffset);
                        });
                    }
                });
            },
            { threshold: 0.25 }
        );

        if (section) observer.observe(section);
        return () => observer.disconnect();
    }, []);

    const aboutInfo = [
        {
            icon: faCode,
            title: "Skills",
            text: "View my technical and creative skill set.",
            link: "#skills"
        },
        {
            icon: faGraduationCap,
            title: "Education",
            text: "My academic background and learning journey.",
            link: "#education"
        },
        {
            icon: faCertificate,
            title: "Certification",
            text: "Certifications and completed trainings.",
            link: "#certification"
        },
        {
            icon: faBriefcase,
            title: "Work",
            text: "Projects and professional work.",
            link: "#work"
        },
        {
            icon: faUserTie,
            title: "Experience",
            text: "Hands-on experience and roles.",
            link: "#experience"
        },
        {
            icon: faBookOpen,
            title: "Journal",
            text: "Reflections and learning highlights from my educational tour.",
            link: "#journal"
        },
        {
            icon: faImages,
            title: "Gallery",
            text: "Photos and moments from my educational tour.",
            link: "#gallery"
        }
    ];

    return (
        <section id="about" className="about-section" ref={sectionRef}>
            <div className="about-container">

                <h2 className="about-title fade-intro">About Me</h2>

                <p className="about-text fade-intro delay-1">
                    I am a part-time online working 3rd-year BSIT student from the Philippines with a growing passion
                    for building digital experiences. I've created various website projects, beginner mini-apps, and UI
                    prototypes.
                    <br /><br />
                    I enjoy crafting clean and soft user interfaces, exploring new tools, experimenting with modern
                    interactive designs, and turning ideas into smooth, functional products.
                </p>

                <div className="about-cards">
                    {aboutInfo.map((info, index) => (
                        <div
                            key={index}
                            className="about-card"
                            ref={el => {
                                cardsRe.current[index] = el;
                            }}
                        >
                            <FontAwesomeIcon icon={info.icon} className="about-icon" />
                            <h3>{info.title}</h3>
                            <p>{info.text}</p>

                            {/* Button Link */}
                            <a href={info.link} className="about-btn">
                                View Section →
                            </a>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
