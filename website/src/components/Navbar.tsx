import logo from "../assets/logo.png";
import "../styles.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="City of San Luis Obispo" className="logo" />
      </div>
      <ul className="nav-links">
        <li>
          <a href="/search" className="active">
            Search
          </a>
          <a href="/query" className="active">
            General Request
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
