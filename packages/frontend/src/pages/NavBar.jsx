import logo from "../assets/sloLogo.png";

function NavBar() {
  const headingStyle = {
    fontWeight: "bold",
    fontFamily: "serif",
    color: "#003E7E"
  };

  return (
    <div>
      <nav className="navbar navbar-light">

        <a style={{ marginLeft: "50px" }} href="/" className="navbar-brand">
          <h3 style={headingStyle}>San Luis Obispo Public Sector Search</h3>
        </a>

        <a style={{ marginLeft: "100px" }} href="/upload" className="navbar-brand">
          <h3>Upload</h3>
        </a>

        <a
          target="_blank"
          href="https://opengov.slocity.org/WebLink/browse.aspx?cr=1"
          className="navbar-brand"
        >
          <img src={logo} style={{ marginLeft: "0px", width: "20%" }} alt="SLO Logo" />
        </a>

      </nav>
    </div>
  );
}

export default NavBar;
