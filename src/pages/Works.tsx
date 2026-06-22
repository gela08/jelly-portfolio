import "../styles/pages/Works.css";
import { Link } from "react-router-dom";

type Work = {
  title: string;
  description: string;
  subtitle: string;
  image: string;
  link: string;
};

const works: Work[] = [
  {
    title: "Jelly's Photobooth",
    subtitle: "Side Project", 
    description: "A vintage-style web photobooth running entirely client-side. Complete with 16 film filters, custom multiple layout matrices, and instant rendering asset downloads.",
    image: "/projects/jellyphotobooth.png", // Ensure this matches your public/projects path asset file
    link: "https://jelly-photobooth.vercel.app/",
  },
  {
    title: "Prince Law Associates",
    subtitle: "Part-time Work", 
    description: "Designed and published multiple high-converting landing pages and real estate dynamic blogs using ShowIt and WordPress integration.",
    image: "/projects/princelawassociates.png",
    link: "https://princelawassociates.com/real-estate",
  },
  
];

export default function Works() {
  return (
    <section className="works-section" id="work">
      <div className="works-container">
        <h2 className="works-title">My Works</h2>
        <p className="works-subtitle">
          A selection of featured projects, web experiments, and UI explorations.
        </p>

        <div className="works-grid">
          {works.map((work, index) => (
            <div key={index} className="work-item reveal">
              <a
                href={work.link}
                className="work-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="work-image-wrapper">
                  <img src={work.image} alt={work.title} loading="lazy" />
                </div>
                <div className="work-info">
                  <span className="work-badge">{work.subtitle}</span>
                  <h2>{work.title}</h2>
                  <p>{work.description}</p>
                  <span className="work-link">
                    View Project <span className="arrow-span">→</span>
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="works-action-wrapper">
          <Link to="/projects" className="works-viewmore">
            View All Projects →
          </Link>
        </div>
      </div>
    </section>
  );
}