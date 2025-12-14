import "../styles/pages/Skills.css";

const skillGroups = [
    {
        title: "Frontend",
        skills: [
            { name: "HTML", logo: "/skills/html.png" },
            { name: "CSS", logo: "/skills/css.png" },
            { name: "JavaScript", logo: "/skills/javascript.png" },
            { name: "TypeScript", logo: "/skills/typescript.png" },
            { name: "React", logo: "/skills/react.png" },
            { name: "Bootstrap", logo: "/skills/bootstrap.png" },
        ],
    },
    {
        title: "Mobile",
        skills: [
            { name: "React Native", logo: "/skills/react-native.png" },
            { name: "Java", logo: "/skills/java.png" },
            { name: "Kotlin", logo: "/skills/kotlin.png" },
            { name: "Android Studio", logo: "/skills/android-studio.png" },
        ],
    },
    {
        title: "Backend, Database, & Cloud",
        skills: [
            { name: "Python (Django)", logo: "/skills/python.png" },
            { name: "C# /.NET", logo: "/skills/csharp.png" },
            { name: "C++", logo: "/skills/cpp.png" },
            { name: "MySQL", logo: "/skills/mysql.png" },
            { name: "Firebase", logo: "/skills/firebase.png" },
            { name: "GitHub", logo: "/skills/github.png", bg: "logo-bg" },
        ],
    },
    {
        title: "Design & CMS",
        skills: [
            { name: "Figma", logo: "/skills/figma.png" },
            { name: "Canva", logo: "/skills/canva.png" },
            { name: "WordPress", logo: "/skills/wordpress.png", bg: "logo-bg" },
            { name: "Showit", logo: "/skills/showit.png", bg: "logo-bg" },
        ],
    },
];

export default function Skills() {
    return (
        <section id="skills" className="skills-section">
            <h2 className="skills-title">Skills</h2>

            {skillGroups.map((group, index) => {
                const isReverse = index % 2 !== 0;

                return (
                    <div
                        key={index}
                        className={`skills-group ${isReverse ? "reverse" : ""}`}
                        style={
                            {
                                "--scroll-duration": `${22 + index * 6}s`,
                            } as React.CSSProperties
                        }

                    >
                        <h3 className="skills-group-title">{group.title}</h3>

                        <div className="skills-carousel">
                            <div className="skills-track">

                                {[...group.skills, ...group.skills].map((skill, i) => (
                                    <div className="skill-item" key={i}>
                                        <div className="skill-logo-wrap">
                                            <img
                                                src={skill.logo}
                                                alt={skill.name}
                                                className={`skill-logo ${skill.bg || ""}`}
                                            />
                                        </div>
                                        <span>{skill.name}</span>
                                    </div>

                                ))}

                            </div>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}
