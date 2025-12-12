import "../styles/components/Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        © {new Date().getFullYear()} Angela Gardan — All rights reserved.
      </div>
    </footer>
  );
}
