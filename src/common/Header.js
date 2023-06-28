import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const Header = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand
            onClick={() => {
              navigate("/");
            }}
            style={{ cursor: "pointer" }}>
            Printf T-Shirts
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            {currentUser && (
              <Nav
                className="me-auto m-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll>
                <Button
                  variant="secondary"
                  onClick={() => {
                    logout();
                  }}>
                  Logout
                </Button>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
