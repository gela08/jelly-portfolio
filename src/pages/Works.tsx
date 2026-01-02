import "../styles/pages/Works.css";
import { Link } from "react-router-dom";

type Work = {
  title: string;
  description: string;
  image: string;
  link: string;
};

const works: Work[] = [
  {
    title: "Prince Law Associates",
    description: "Designed and published multiple pages using ShowIt",
    image: "/projects/princelawassociates.png",
    link: "https://princelawassociates.com/real-estate",
  },
  {
    title: "Riverside Oaks Golf Resort",
    description: "Created a responsive page using WordPress",
    image: "/projects/riversideoaks.png",
    link: "https://wordpress-1540755-5959318.cloudwaysapps.com/weddings/",
  },
];

export default function Works() {
  return (
    <section className="works-section" id="work">
      <h2 className="works-title">My Works</h2>
      <p className="works-subtitle">
        A selection of projects, experiments, and UI explorations.
      </p>

      <div className="timeline">
        {/* <div className="timeline-line" /> */}

        {works.map((work, index) => (
          <div
            key={index}
            className="timeline-item"
            // className={`timeline-item ${
            //   index % 2 === 0 ? "left" : "right"
            // } reveal`}
          >
            <div className="timeline-dot" />

            <a
              href={work.link}
              className="work-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={work.image} alt={work.title} />
              <div className="work-info">
                <h2>{work.title}</h2>
                <p>{work.description}</p>
                <span className="work-link">View Project →</span>
              </div>
              
            </a>
          </div>
        ))}
      </div>

      <Link to="/projects" className="works-viewmore">
        View All Projects →
      </Link>
      
    </section>
  );
}
