import { useEffect, useRef } from "react";
import "../styles/pages/About.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopCode, faPaintBrush, faMobileAlt } from "@fortawesome/free-solid-svg-icons";

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
            icon: faLaptopCode,
            title: "Web Development",
            text: "Building responsive, modern websites using smooth UI, animations, and clean design architecture."
        },
        {
            icon: faPaintBrush,
            title: "UI / UX Design",
            text: "Designing soft, aesthetic interfaces that focus on clarity, usability, and visual harmony."
        },
        {
            icon: faMobileAlt,
            title: "Mobile Development",
            text: "Creating mobile experiences through React Native with modern, fluid, user-centered interfaces."
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
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
