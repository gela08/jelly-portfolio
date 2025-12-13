import { useEffect, useRef } from "react";
import Typed from "typed.js";
import "../styles/pages/Home.css";
import avatar from "../assets/avatar.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faInstagram, faDev } from "@fortawesome/free-brands-svg-icons";

export default function Home() {
  const typingRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const typed = new Typed(typingRef.current!, {
      strings: [
        "Full-Stack Web Developer",
        "Website Builder",
        "UI/UX Designer",
        "Android Developer",
        "Mobile App Developer",
        "Web Game Developer"
      ],
      typeSpeed: 70,
      backSpeed: 40,
      backDelay: 1000,
      loop: true,
    });

    return () => typed.destroy();
  }, []);

  return (
    <section className="home-container" id="home">
      <div className="home-left">
        <h1 className="fade-in">Hello,</h1>
        <h1 className="fade-in delay-1">
          I'm <span className="highlight">Angela Gardan</span>
        </h1>

        <p className="subtitle fade-in delay-2">
          I Am A{" "}
          <span className="typing-wrapper">
            <span className="typing" ref={typingRef}></span>
          </span>
        </p>


        <a className="about-btn fade-in delay-3" href="#about">
          About Me ↓
        </a>

        {/* SOCIAL ICONS */}
        <div className="socials fade-in delay-4">
          <a href="https://www.linkedin.com/in/gela08/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>

          <a href="https://github.com/gela08" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} />
          </a>

          <a href="https://www.instagram.com/acer._.x/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>

          <a href="https://dev.to/gela08" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faDev} />
          </a>
        </div>
      </div>

      {/* RIGHT SIDE AVATAR */}
      <div className="home-right fade-in delay-5">
        <div className="avatar-circle">
          <img src={avatar} alt="avatar" />
        </div>
      </div>
    </section>
  );
}
