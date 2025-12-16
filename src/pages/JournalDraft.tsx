import "../styles/pages/Journal.css";

type JournalEntry = {
  image: string;
  title: string;
  subtitle: string;
  info: string;
};

const journalData: JournalEntry[] = [
  {
    image: "/gallery/edu/bohol-1.jpg",
    title: "Industry Exposure",
    subtitle: "Cebu – Bohol Educational Tour",
    info:
      "Visited multiple IT-related infrastructures and gained firsthand exposure to real-world systems and professional environments.",
  },
  {
    image: "/gallery/edu/group-1.jpg",
    title: "Batch Memory",
    subtitle: "BSIT Students",
    info:
      "A shared moment with my classmates—one of the highlights of our journey together as IT students.",
  },
  {
    image: "/gallery/edu/activity-1.jpg",
    title: "On-Site Learning",
    subtitle: "Guided Session",
    info:
      "Hands-on explanations and real-time demonstrations that helped connect theory with actual industry practices.",
  },
];

export default function Journal() {
  return (
    <section id="journal" className="journal-section">
      <h2 className="journal-title">Journal</h2>
      <p className="journal-subtitle">
        A visual record of learning moments, experiences, and memories.
      </p>

      <div className="journal-grid">
        {journalData.map((item, index) => (
          <article className="journal-card" key={index}>
            <div className="journal-image">
              <img src={item.image} alt={item.title} />
            </div>

            <div className="journal-content">
              <h3>{item.title}</h3>
              <span className="journal-sub">{item.subtitle}</span>
              <p>{item.info}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
