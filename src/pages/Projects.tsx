import "../styles/pages/Projects.css";

const projects = [

  {
    id: "ro",
    year: "3rd Year",
    title: "Riverside Oaks",
    description:
      "Created a responsive and elegant website using WordPress Elementor.",
    link: "https://wordpress-1540755-5959318.cloudwaysapps.com/weddings/",
  },
  {
    id: "pla",
    year: "3rd Year",
    title: "Prince Law Associates",
    description:
      "Designed and published multiple pages and blogs using ShowIt and WordPress.",
    link: "https://princelawassociates.com/real-estate",
  },
  {
    id: "dcc",
    year: "2nd Year",
    title: "Dino's Crave Cave",
    description:
      "Created a functional food ordering website. (Unfinished)",
    link: "https://dinos-cave-crave.vercel.app/",
  },
  {
    id: "zeke",
    year: "2nd Year",
    title: "Valentine's Day Challenge",
    description:
      "Created a simple wiring game challenge for Valentine's Day.",
    link: "https://valentines-game-challenge-for-my-engineer-alfaro.vercel.app/",
  },
  {
    id: "kyan",
    year: "2022",
    title: "17th Birthday Website",
    description:
      "Built a birthday website for my bff using Wix. (Private)",
    link: "",
  },
];

type ProjectCardProps = {
  title: string;
  description: string;
  link: string;
  year: string;
  index: number;
};

export default function Projects() {
  return (
    <section className="projects-page">
      <h1>Projects</h1>
      <p className="projects-sub">
        A curated collection of my professional and personal work.
      </p>

      <div className="projects-timeline">
        <div className="projects-timeline-line" />

        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            link={project.link}
            year={project.year}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  title,
  description,
  link,
  year,
  index,
}: ProjectCardProps) {
  return (

    
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`project-row ${index % 2 === 0 ? "left" : "right"}`}
    >
      <div className="projects-timeline-dot" />
      
      <div className="project-box">
        

        <span className="project-year">{year}</span>
        <h2>{title}</h2>
        <p>{description}</p>
        <span className="project-link">Visit project →</span>
      </div>
    </a>
  );
}
