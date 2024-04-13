import logo from "./assets/sloLogo.png";

function NavBar() {
  return (
    <div>
      <nav class="navbar navbar-light bg-light">
        <a style={{ marginLeft: "200px" }} href="/" className="navbar-brand">
          <h3>Search</h3>
        </a>

        <a
          target="_blank"
          href="https://opengov.slocity.org/WebLink/browse.aspx?cr=1"
          className="navbar-brand"
        >
          <img src={logo} style={{ width: "20%" }} alt="SLO Logo" />
        </a>
      </nav>
    </div>
  );
}

export default NavBar;
