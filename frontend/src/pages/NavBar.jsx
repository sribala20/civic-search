import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import logo from "../assets/sloLogo.png";
import "./styles.css";

function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        <img src={logo} alt="SLO Logo" style={{ width: "80px" }} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/advanced-search">Advanced Search</Nav.Link>
          <Nav.Link href="/upload">Upload</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
