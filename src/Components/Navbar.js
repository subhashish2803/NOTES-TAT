import { Nav, Navbar, Container } from "react-bootstrap";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import logo1 from "../assets/img/moon.png";
import logo2 from "../assets/img/sun.png";
import { Link } from "react-router-dom";

export default function Header() {
  const { currentUser } = useAuth();
  const [buttonText, setButtonText] = useState("Login");

  React.useEffect(() => {
    let username = "";
    if (currentUser && currentUser.displayName) {
      if (currentUser.displayName.includes(" ")) {
        username = currentUser.displayName.slice(
          0,
          currentUser.displayName.indexOf(" ")
        );
        if (username.length > 15) username = username.slice(0, 15);
      } else if (currentUser.displayName.length > 15) {
        username = currentUser.displayName.slice(0, 15);
      } else {
        username = currentUser.displayName;
      }
      setButtonText(username);
    } else if (currentUser && currentUser.email) {
      if (currentUser.email.includes("@")) {
        username = currentUser.email.slice(0, currentUser.email.indexOf("@"));
        if (username.length > 15) username = username.slice(0, 15);
      }
      setButtonText(username);
    } else {
      setButtonText("Login");
    }
  }, [currentUser]);

  const [isDark, setIsDark] = React.useState(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event) => setIsDark(event.matches ? true : false);
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <Navbar
      sticky="top"
      className={`navbar navbar-expand-lg py-4 cdin ${isDark ? "navbar-dark" : ""}`}
      expand="lg"
    >
      <Container>
        <Nav>
          <Navbar.Brand>
            <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
              <img
                src={isDark ? logo1 : logo2}
                alt="logo"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
              <h5 className={isDark ? "text-white" : "text-dark mt-2"} >VISTOFY</h5>
            </Link>
          </Navbar.Brand>
        </Nav>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0">
            <Link to="/notes" className="nav-link">
              Notes
            </Link>
          </Nav>
          <Nav>
            <Link to="/team" className="nav-link">
              About Us
            </Link>
            {currentUser ? (
              <Link to="/profile" className="nav-link">
                {buttonText}
              </Link>
            ) : (
              <Link to="/login" className="nav-link">
                {buttonText}
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
