import { useEffect, useRef } from "react";
import Typed from "typed.js";
import "../styles/pages/Home.css";
import avatar from "../assets/avatar.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faInstagram, faDev } from "@fortawesome/free-brands-svg-icons";

export default function Home() {
  const typingRef = useRef<HTMLSpanElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);


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

useEffect(() => {
  const avatar = avatarRef.current;
  if (!avatar) return;

  avatar.classList.add("avatar-scroll-up");

  const onScroll = () => {
    if (window.innerWidth > 850) return;

    const currentScroll = window.scrollY;
    const scrollingDown = currentScroll > lastScrollY.current;

    if (scrollingDown) {
      avatar.classList.add("avatar-scroll-down");
      avatar.classList.remove("avatar-scroll-up");
    } else {
      avatar.classList.add("avatar-scroll-up");
      avatar.classList.remove("avatar-scroll-down");
    }

    lastScrollY.current = currentScroll;
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, []);

 useEffect(() => {
  const avatar = avatarRef.current;
  if (!avatar) return;

  // Set initial state
  avatar.classList.add("avatar-scroll-up");

  const handleScroll = () => {
    const currentScroll = window.scrollY;
    const scrollingDown = currentScroll > lastScrollY.current;

    if (scrollingDown) {
      avatar.classList.add("avatar-scroll-down");
      avatar.classList.remove("avatar-scroll-up");
    } else {
      avatar.classList.add("avatar-scroll-up");
      avatar.classList.remove("avatar-scroll-down");
    }

    lastScrollY.current = currentScroll;
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
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
      <div className="home-right fade-in delay-5" ref={avatarRef}>
        <div className="avatar-circle">
          <img src={avatar} alt="avatar" />
        </div>
      </div>
    </section>
  );
}
