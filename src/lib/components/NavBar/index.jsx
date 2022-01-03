import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <Navbar bg="primary" variant="dark" sticky="top" expand="md">
      <Container>
        <Navbar.Brand href="#">
          {/* <Link to="/" className="text-white" style={{ textDecoration: "none" }} isActive={false}> */}
          Full-Stack Job App
          {/* </Link> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Link to="/">Home</Link> */}
            {/* <Nav.Link href="#"> */}
            <Link to="/" className="text-white">
              Home
            </Link>
            {/* </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
