import "../styles/pages/Education.css";
import { useState } from "react";
import { useEffect } from "react";



const educationData = [
    {
        title: "Bachelor of Science in Information Technology",
        school: "Holy Cross of Davao College",
        year: "Aug 2023 – Present",
        status: "Pursuing",
        image: "/education/hcdclogo.png",
        // hoverImages: [
        //     "/education/hcdc-campus.jpg",
        //     "/education/hcdc-classroom.jpg",
        //     "/education/hcdc-certificate.jpg",
        // ],
    },
    {
        title: "Senior High School",
        school: "Assumption College of Davao",
        year: "Aug 2021 – Mar 2023",
        status: "Completed",
        image: "/education/assumptionlogo.png",
        // hoverImages: [
        //     "/education/assumption-campus.jpg",
        //     "/education/assumption-classroom.jpg",
        //     "/education/assumption-certificate.jpg",
        // ],
    },
    {
        title: "Junior High School",
        school: "Holy Cross of Davao College Basic Education Department",
        year: "Jun 2017 – Mar 2021",
        status: "Completed",
        image: "/education/hcdcbedlogo.png",
        // hoverImages: [
        //     "/education/hcdcbed-campus1.jpg",
        //     "/education/hcdcbed-classroom1.jpg",
        //     "/education/hcdcbed-certificate1.jpg",
        // ],
    },
    {
        title: "Elementary School",
        school: "Holy Cross of Davao College Basic Education Department",
        year: "Jun 2010 – Mar 2017",
        status: "Completed",
        image: "/education/hcdcbedlogo.png",
        hoverImages: [
            "/education/hcdcbed-campus.png",
            "/education/hcdcbed-classroom.jpg",
            "/education/hcdcbed-schoolevent.jpg",
            "/education/hcdcbed-event.jpg",
            "/education/hcdcbed-classpic.jpg",
            // "/education/hcdcbed-certificate.jpg",
        ],
    }
];


export default function Education() {

    const [preview, setPreview] = useState({
        show: false,
        x: 0,
        y: 0,
        images: [] as string[],
        index: 0,
        status: "",
    });

    useEffect(() => {
        if (!preview.show || preview.images.length <= 1) return;

        const interval = setInterval(() => {
            setPreview((prev) => ({
                ...prev,
                index: (prev.index + 1) % prev.images.length,
            }));
        }, 1200); // speed of sequence

        return () => clearInterval(interval);
    }, [preview.show, preview.images]);


    return (
        <section id="education" className="education-section">
            <h2 className="section-title">My Education</h2>
            <p className="section-subtitle">
                Education is not the learning of facts, but the training of the mind to think.
            </p>

            <div className="education-timeline">
                {educationData.map((edu, index) => (

                    <div
                        className="education-card"
                        key={index}
                        onMouseEnter={(e) =>
                            setPreview({
                                show: true,
                                x: e.clientX,
                                y: e.clientY,
                                images: edu.hoverImages?.length
                                    ? edu.hoverImages
                                    : [edu.image],
                                index: 0,
                                status: edu.status.toLowerCase(),
                            })
                        }


                        onMouseMove={(e) =>
                            setPreview((prev) => ({
                                ...prev,
                                x: e.clientX,
                                y: e.clientY,
                            }))
                        }
                        onMouseLeave={() =>
                            setPreview((prev) => ({ ...prev, show: false }))
                        }
                    >


                        {/* Image */}
                        <div className="edu-image">
                            <img src={edu.image} alt={edu.school} />
                        </div>

                        {/* Content */}
                        <div className="edu-content">
                            <span className={`edu-status ${edu.status.toLowerCase()}`}>
                                {edu.status}
                            </span>

                            <h3>{edu.title}</h3>
                            <h4>{edu.school}</h4>
                            <p className="edu-year">{edu.year}</p>
                        </div>
                    </div>

                ))}
            </div>
            {/* Hover Preview */}
            <div
                className={`edu-hover-preview ${preview.show ? "show" : ""}`}
                style={{
                    top: Math.min(preview.y + 24, window.innerHeight - 220),
                    left: Math.min(preview.x + 24, window.innerWidth - 320),
                }}
            >
                <div className={`hover-stack ${preview.status}`}>
                    {preview.images.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            className={`hover-img ${i === preview.index ? "active" : ""}`}
                            alt=""
                        />
                    ))}
                </div>
            </div>


        </section>
    );
}
