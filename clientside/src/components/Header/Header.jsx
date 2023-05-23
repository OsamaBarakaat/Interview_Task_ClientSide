import React from "react";
import Nav from "react-bootstrap/Nav";
import { NavLink, Link } from "react-router-dom";
import "./Header";
function Header() {
  return (
    <>
      <Nav
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
            <Link to={"/Footer"}>Footer</Link>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default Header;
