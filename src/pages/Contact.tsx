import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "../styles/pages/Contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDev, faFacebook, faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [status, setStatus] = useState<Status>("idle");

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current || status === "sending") return;

        setStatus("sending");

        emailjs
            .sendForm(
                "service_9glarw8",        // Service ID
                "template_9254v67",       // Template ID
                formRef.current,
                "qmKCDt5NVnF-gOKbH"        // Public Key
            )
            .then(
                () => {
                    setStatus("success");
                    formRef.current?.reset();
                },
                () => {
                    setStatus("error");
                }
            );
    };

    return (
        <section className="contact-section" id="contact">
            <div className="contact-container">

                {/* Header */}
                <header className="contact-header">
                    <span className="contact-eyebrow">Contact</span>
                    <h1>Let’s work together.</h1>
                    <p>
                        Have a project in mind or just want to say hello?
                        I’d love to hear from you.
                    </p>
                </header>

                <div className="contact-grid">

                    {/* Info */}
                    <div className="contact-info">
                        <div className="info-block">
                            <span>Email</span>
                            <p>AngelaGardan41@gmail.com</p>
                        </div>

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

                            <a href="https://www.facebook.com/gelagardan" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                        </div>

                        <a
                            href="/CV.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resume-link"
                        >
                            View Resume →
                        </a>
                    </div>

                    {/* Form */}
                    <form
                        ref={formRef}
                        className={`contact-form ${status}`}
                        onSubmit={sendEmail}
                        aria-live="polite"
                    >
                        {/* Honeypot */}
                        <input
                            type="text"
                            name="company"
                            tabIndex={-1}
                            autoComplete="off"
                            className="honeypot"
                        />

                        <label htmlFor="name" className="sr-only">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Your name"
                            required
                            disabled={status === "success"}
                        />

                        <label htmlFor="email" className="sr-only">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Your email"
                            required
                            disabled={status === "success"}
                        />

                        <label htmlFor="message" className="sr-only">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            placeholder="Your message"
                            required
                            disabled={status === "success"}
                        />

                        <button
                            type="submit"
                            disabled={status === "sending" || status === "success"}
                        >
                            {status === "sending"
                                ? "Sending…"
                                : status === "success"
                                    ? "Sent ✓"
                                    : "Send Message"}
                        </button>

                        {/* Success */}
                        {status === "success" && (
                            <div className="success-wrap">
                                <svg
                                    className="checkmark"
                                    viewBox="0 0 52 52"
                                    aria-hidden="true"
                                >
                                    <circle
                                        className="checkmark-circle"
                                        cx="26"
                                        cy="26"
                                        r="25"
                                        fill="none"
                                    />
                                    <path
                                        className="checkmark-check"
                                        fill="none"
                                        d="M14 27l7 7 17-17"
                                    />
                                </svg>

                                <p className="form-status success">
                                    Message sent — I’ll get back to you soon.
                                </p>

                                <button
                                    type="button"
                                    className="reset-btn"
                                    onClick={() => setStatus("idle")}
                                >
                                    Send another message
                                </button>
                            </div>
                        )}

                        {/* Error */}
                        {status === "error" && (
                            <p className="form-status error">
                                Something went wrong. Please try again.
                            </p>
                        )}
                    </form>

                </div>
            </div>
        </section>
    );
}
