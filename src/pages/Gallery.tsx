import "../styles/pages/Gallery.css";

const eduGallery = [
  {
    src: "/gallery/ch-bohol.png",
    title: "University Visit",
    subtitle: "Cebu Educational Tour",
  },
  {
    src: "/gallery/cebu1.png",
    title: "Industry Exposure",
    subtitle: "IT & Infrastructure",
  },
  {
    src: "/gallery/cebu2.png",
    title: "Batch Photo",
    subtitle: "BSIT Students",
  },
  {
    src: "/gallery/groupap.png",
    title: "On-Site Learning",
    subtitle: "Guided Tour Session",
  },
  {
    src: "/gallery/groupap2.png",
    title: "On-Site Learning",
    subtitle: "Guided Tour Session",
  },

  {
    src: "/gallery/backseaters.png",
    title: "On-Site Learning",
    subtitle: "Guided Tour Session",
  },
  {
    src: "/gallery/takbo.png",
    title: "Batch Photo",
    subtitle: "BSIT Students",
  },
  {
    src: "/gallery/speedmiming.png",
    title: "Batch Photo",
    subtitle: "BSIT Students",
  },
  {
    src: "/gallery/gasto.png",
    title: "Batch Photo",
    subtitle: "BSIT Students",
  },
  {
    src: "/gallery/gym.png",
    title: "Batch Photo",
    subtitle: "BSIT Students",
  },
  {
    src: "/gallery/yanerz.png",
    title: "Batch Photo",
    subtitle: "BSIT Students",
  },
];

export default function EducationGallery() {
  return (
    <section id="education-gallery" className="edu-gallery-section">
      <h2 className="edu-gallery-title">Educational Tour</h2>
      <p className="edu-gallery-sub">
        Documentation from our Cebu–Bohol educational tour and industry visits
      </p>

      <div className="edu-gallery-carousel">
        <div className="edu-gallery-track">
          {[...eduGallery, ...eduGallery].map((item, i) => (
            <figure className="edu-gallery-card" key={i}>
              <img src={item.src} alt={item.title} />
              {/* <figcaption>
                <strong>{item.title}</strong>
                <span>{item.subtitle}</span>
              </figcaption> */}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
