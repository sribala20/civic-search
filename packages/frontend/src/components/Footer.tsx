import logo from "../assets/logo.png";
import "../styles.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt="City of San Luis Obispo" className="logo" />
        </div>
        <div className="footer-text">
          <p>
            City of San Luis Obispo
            <br />
            990 Palm Street
            <br />
            San Luis Obispo, CA 93401
          </p>
          <p>Phone: (805) 781-7100</p>
          <p>Email: info@slocity.org</p>
          <p>&copy; {new Date().getFullYear()} City of San Luis Obispo</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
