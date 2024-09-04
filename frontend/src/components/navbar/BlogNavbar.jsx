import React, { useContext } from "react";
import { Button, Container, Form, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";
import { AuthorContext } from "../../context/AuthorContextProvider";
const NavBar = (props) => {
  const { setSearchBlogPost } = props;
  const { AuthAuthor, Token } = useContext(AuthorContext);
  return (
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container className="justify-content-between">
        <Navbar.Brand as={Link} to="/">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>
        {Token && (
          <Form>
            <Form.Control
              type="text"
              placeholder="Cerca l'articolo..."
              onChange={(e) => setSearchBlogPost(e.target.value)}
            />
          </Form>
        )}
        {Token && (
          <>
            <Button
              as={Link}
              to="/new"
              className="blog-navbar-add-button bg-dark"
              size="lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus-lg"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
              </svg>
              Nuovo Articolo
            </Button>
            <Button as={Link} to={"/me"} variant="primary">
              <img src={AuthAuthor.avatar} alt="profile" roundedCircle />
              {AuthAuthor.name} {AuthAuthor.surname}
            </Button>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
