import { useRef, useState, type MouseEvent } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async"; // 1. Import Helmet
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faBriefcase,
  faGraduationCap,
  faCode,
  faHeart,
  faExternalLinkAlt
} from "@fortawesome/free-solid-svg-icons";

import "../styles/pages/Projects.css";

const TAG_CLASS: Record<string, string> = {
  "Ongoing": "tag--ongoing",
  "Side Project": "tag--side",
  "School": "tag--school",
  "Client": "tag--client",
  "Personal": "tag--personal",
};

const TAG_ICONS: Record<string, any> = {
  "Ongoing": faRocket,
  "Side Project": faCode,
  "School": faGraduationCap,
  "Client": faBriefcase,
  "Personal": faHeart,
};

const projects = [
  {
    id: "lnmj",
    year: "Ongoing",
    tag: "Ongoing",
    title: "Luto ni Mommy Jho",
    description: "Filipino catering & food-order site for my mom's home business. Authentic recipes, pre-orders, and catering inquiries — all in one place.",
    link: "https://luto-ni-mommy-jho.vercel.app/",
  },
  {
    id: "jelly",
    year: "3rd Year",
    tag: "Side Project",
    title: "Jelly's Photobooth",
    description: "A vintage-style photobooth running entirely in your browser. 16 film filters, multiple layouts, instant high-res download — no sign-up required.",
    link: "https://jelly-photobooth.vercel.app/",
  },
  {
    id: "sth",
    year: "3rd Year",
    tag: "Side Project",
    title: "Simple Tools Hub",
    description: "31 free, privacy-first utility tools — word counters, password generators, unit converters and more. Everything runs client-side with no tracking.",
    link: "https://simple-tools-hub.vercel.app/",
  },
  {
    id: "qi",
    year: "3rd Year",
    tag: "School",
    title: "Quest Inventory",
    description: "An RPG-themed cloud inventory manager built as a school assignment. Upload, manage, and track items with a stylized game UI.",
    link: "https://gela08.github.io/Quest-Inventory/",
  },
  {
    id: "ro",
    year: "3rd Year",
    tag: "Client",
    title: "Riverside Oaks",
    description: "Responsive and elegant wedding-venue website built with WordPress Elementor.",
    link: "https://wordpress-1540755-5959318.cloudwaysapps.com/weddings/",
  },
  {
    id: "pla",
    year: "3rd Year",
    tag: "Client",
    title: "Prince Law Associates",
    description: "Multiple pages and blogs designed and published using ShowIt and WordPress.",
    link: "https://princelawassociates.com/real-estate",
  },
  {
    id: "dcc",
    year: "2nd Year",
    tag: "School",
    title: "Dino's Crave Cave",
    description: "A functional food-ordering website. Work in progress.",
    link: "https://dinos-cave-crave.vercel.app/",
  },
  {
    id: "zeke",
    year: "2nd Year",
    tag: "Personal",
    title: "Valentine's Day Challenge",
    description: "A hand-crafted wiring game made as a Valentine's Day surprise.",
    link: "https://valentines-game-challenge-for-my-engineer-alfaro.vercel.app/",
  },
  {
    id: "kyan",
    year: "2022",
    tag: "Personal",
    title: "17th Birthday Website",
    description: "Birthday website built on Wix for my best friend.",
    link: "",
  },
].map((project, index) => ({ ...project, originalIndex: index }));

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] as const } 
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    transition: { duration: 0.25 }
  }
};

type Project = (typeof projects)[number];

export default function Projects() {
  const wrapperRef = useRef(null);
  const inView = useInView(wrapperRef, { once: true, amount: 0.03 });
  const [selectedFilter] = useState<string | null>(null);

  const filteredProjects = selectedFilter
    ? projects.filter(p => p.tag === selectedFilter)
    : projects;

  return (
    <section className="projects-page">
      {/* 2. Inject Dynamic SEO Tags for search crawlers */}
      <Helmet>
        <title>Projects | Luto ni Mommy Jho, Jelly's Photobooth & More by Angela Gardan</title>
        <meta name="description" content="Explore Angela Gardan's portfolio of web development projects, featuring Luto ni Mommy Jho, Jelly's Photobooth, Simple Tools Hub, and custom React applications." />
        <link rel="canonical" href="https://www.akaizer.dev/projects" />
        
        <meta property="og:title" content="Projects | Built by Angela Gardan" />
        <meta property="og:description" content="Explore Angela Gardan's portfolio of web development projects, featuring live deployed web tools and client applications." />
        <meta property="og:url" content="https://www.akaizer.dev/projects" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="projects-header"
      >
        <h1>Projects</h1>
        <p className="projects-sub">
          A curated collection of my professional and personal work — from side projects to client work.
        </p>
      </motion.div>

      <motion.div
        ref={wrapperRef}
        className="projects-timeline"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        <div className="projects-timeline-line" />

        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const side = project.originalIndex % 2 === 0 ? "left" : "right";
            return (
              <motion.div
                key={project.id}
                className={`project-row project-row--${side}`}
                variants={cardVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                layout
              >
                <span className="projects-timeline-dot" aria-hidden="true" />
                <ProjectCard project={project} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {filteredProjects.length === 0 && (
          <motion.div
            className="no-projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>No projects in this category yet.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { title, description, link, year, tag } = project;
  const isPrivate = !link;
  const tagClass = TAG_CLASS[tag] ?? "tag--personal";
  const tagIcon = TAG_ICONS[tag] || faCode;

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    currentTarget.style.setProperty("--mouse-x", `${x}px`);
    currentTarget.style.setProperty("--mouse-y", `${y}px`);
  }

  const inner = (
    <motion.div
      className={`project-box${isPrivate ? " project-box--private" : ""}`}
      whileHover={isPrivate ? {} : { y: -6, scale: 1.01 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
    >
      <div className="project-box-gradient" aria-hidden="true" />

      <div className="project-meta">
        {year !== tag && <span className="project-year">{year}</span>}
        <span className={`project-tag ${tagClass}`}>
          <FontAwesomeIcon icon={tagIcon} />
          {tag}
        </span>
      </div>

      <h2 className="project-title">{title}</h2>
      <p className="project-description">{description}</p>

      {isPrivate ? (
        <span className="project-link project-link--private">⏳ Coming Soon</span>
      ) : (
        <motion.span
          className="project-link"
          initial={false}
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <span className="link-text">Visit project</span>
          <FontAwesomeIcon icon={faExternalLinkAlt} className="link-icon" />
        </motion.span>
      )}
    </motion.div>
  );

  return isPrivate ? (
    <div className="project-link-wrapper">{inner}</div>
  ) : (
    <a href={link} target="_blank" rel="noopener noreferrer" className="project-link-wrapper">
      {inner}
    </a>
  );
}