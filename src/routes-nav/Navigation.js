import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import UserContext from "../auth/UserContext";
import { FcFilmReel } from "react-icons/fc"
import "./Navigation.css";

function Navigation({ logout }) {

  const { currentUser } = useContext(UserContext);

  function loggedInNav(){
    return (
      <>
              <Nav.Link as={NavLink} to="/journal-list">Journal</Nav.Link>
              <Nav.Link as={NavLink} to="/favorites">Favorites</Nav.Link>
              <Nav.Link as={NavLink} to="/seen">Movie History</Nav.Link>
              <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
              <Nav.Link as={NavLink} className="logout" to="/" onClick={logout}>
                Logout
              </Nav.Link>
  
      </>
    );
  }

  function loggedOutNav() {
    return (
      <>
          
              <Nav.Link as={NavLink} to="/login">Log In</Nav.Link>
              <Nav.Link as={NavLink} to="/signup">Sign Up</Nav.Link>
  
      </>
    );
  }
  
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand className="navbar-brand" as={NavLink} to="/">
            MMJ <FcFilmReel size={30}/>
          </Navbar.Brand>
          <Nav>
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            {currentUser ? loggedInNav() : loggedOutNav()}
          </Nav>
        </Container>
      </Navbar>
    </> 
  )
}

export default Navigation;