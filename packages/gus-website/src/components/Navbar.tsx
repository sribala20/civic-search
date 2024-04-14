import { useAuth } from "../AuthContext";
import logo from "../assets/logo.png";
import "../styles.css";

const Navbar = () => {
  const { loggedIn, admin, setLoggedIn, setAdmin } = useAuth();

  const handleLogout = () => {
    setLoggedIn && setLoggedIn(false);
    setAdmin && setAdmin(false);
    alert("Logged out");
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <a href="/">
          <img src={logo} alt="City of San Luis Obispo" className="logo" />
        </a>
      </div>
      <ul className="nav-links">
        <li>
          {loggedIn && (
            <>
              <a href="/search" className="active">
                Search
              </a>
              <a href="/query" className="active">
                General Request
              </a>
            </>
          )}
          {loggedIn && admin && (
            <a href="/upload" className="active">
              Upload Documents
            </a>
          )}
          {loggedIn ? (
            <a href="/" onClick={handleLogout} className="active">
              logout
            </a>
          ) : (
            <a href="/login" className="active">
              Login
            </a>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
