import React from "react";
import Nav from "react-bootstrap/Nav";
import { NavLink, Link } from "react-router-dom";
import "./Header.css";
import { Container, Navbar } from "react-bootstrap";
function Header() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Interview Task</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  transition: "color 1s, font-size 1s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "red";
                  e.target.style.fontSize = "1.2em";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "white";
                  e.target.style.fontSize = "1em";
                }}
              >
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="/Portfolio"
                style={{
                  textDecoration: "none",
                  color: "white",
                  transition: "color 1s, font-size 1s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "red";
                  e.target.style.fontSize = "1.2em";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "white";
                  e.target.style.fontSize = "1em";
                }}
              >
                Portfolio
              </Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {/* <Nav
        variant="tabs"
        className="justify-content-center"
        defaultActiveKey="/"
      >
        <Nav.Item>
          <Nav.Link eventKey="link-1">
            <Link to={"/"}>Home</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">
            <Link to="/Footer">Footer</Link>
          </Nav.Link>
        </Nav.Item>
      </Nav> */}
    </>
  );
}

export default Header;
