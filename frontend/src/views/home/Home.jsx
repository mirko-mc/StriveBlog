import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
// import "./styles.css";
import { PostLogin, PostNewAuthor, PatchPicture } from "../../data/fetch";
import { AuthorContext } from "../../context/AuthorContextProvider";
import { Link, useNavigate } from "react-router-dom";

const Home = (props) => {
  console.log("home => home.jsx");
  const { Token, SetToken } = useContext(AuthorContext);
  /** fD conterrà l'immagine da passare alla fetch */
  const [fD, setFD] = useState(new FormData());
  const [ShowLogin, SetShowLogin] = useState(false);
  const [ShowRegister, SetShowRegister] = useState(false);
  // * blocco accesso google
  const navigate = useNavigate();
  // useEffect(() => {
  //   /** prendo il token dall'url */
  //   const JwtToken = new URLSearchParams(window.location.search).get("token");
  //   console.log(JwtToken)
  //   /** se esiste salvo il token nel localStorage, nel context e ridireziono alla home */
  //   if (JwtToken) {
  //     localStorage.setItem("token", JwtToken);
  //     SetToken(JwtToken);
  // navigate("/");
  //   }
  // }, [SetToken, navigate]);
  // * fine blocco accesso google

  const HandleLogout = () => {
    SetToken(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  /** per gestire uso un ternario nella funzione per stabilire quale dei due modali chiudere */
  const handleClose = () =>
    ShowLogin ? SetShowLogin(false) : SetShowRegister(false);
  const [formValue, setFormValue] = useState();
  const InitialFormValueLogin = {
    email: "",
    password: "",
  };
  const InitialFormValueRegister = {
    name: "",
    surname: "",
    email: "",
    password: "",
    birthDate: "",
    avatar: "",
    // "https://njhalloffame.org/wp-content/uploads/2021/04/generic-avatar-300x300.png",
  };
  const HandleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  useEffect(
    () =>
      ShowLogin
        ? setFormValue(InitialFormValueLogin)
        : setFormValue(InitialFormValueRegister),
    [ShowLogin, ShowRegister]
  );
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log(formValue);
    const TokenObj = await PostLogin(formValue);
    if (TokenObj?.token) {
      localStorage.setItem("token", TokenObj.token);
      SetToken(TokenObj.token);
    }
    handleClose();
  };
  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    // !!! attendo che l'autore venga salvato
    const CreatedAuthor = await PostNewAuthor(formValue);
    console.log(CreatedAuthor);
    // !!! aggiungo l'avatar al post
    fD.get("avatar") && (await PatchPicture("avatar", CreatedAuthor._id, fD));
    // !!! restituisco il messaggio di autore salvato
    alert("Autore salvato con successo");
    // !!! ritorno alla home
  };
  const handlePicture = (e) => {
    setFD((prev) => {
      // svuoto il formData
      prev.delete("avatar");
      // inserisco l'immagine nel formData
      prev.append("avatar", e.target.files[0]);
      return prev;
    });
  };

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
      {Token && <BlogList />}
      {!Token && (
        <Row>
          <Col
            md={6}
            className="d-flex flex-column align-items-center mb-3 border border-primary border-top-0 border-bottom-0 border-start-0"
          >
            <h4 className="my-3">Effettua il login tramite e-mail</h4>
            <Form onSubmit={handleLoginSubmit}>
              <Form.Group className="mb-3 justify-content-center">
                <Form.Label>email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={HandleChange}
                  required
                ></Form.Control>
                <Form.Label>password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={HandleChange}
                  required
                ></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary">
                Login
              </Button>
            </Form>
          </Col>

          <Col
            md={6}
            className="d-flex flex-column align-items-center mb-3 border border-primary border-top-0 border-end-0 border-bottom-0"
          >
            <h4 className="mb-3">Effettua il login tramite Google</h4>
            <Button
              as="a"
              href={`${process.env.REACT_APP_API_URL}/login-google`}
              variant="primary"
              className="my-3"
            >
              Login Google
            </Button>
          </Col>

          <Col
            md={12}
            className="d-flex flex-column align-items-center mb-3 border border-primary border-end-0 border-bottom-0 border-start-0"
          >
            <h4 className="my-3">
              Non sei registrato? Cosa aspetti, registrati
            </h4>
            <Button
              variant="primary"
              className="mb-3"
              onClick={() => SetShowRegister(true)}
            >
              Registrati
            </Button>
          </Col>
        </Row>
      )}
      <div>
        <Button as={Link} to={"/me"} variant="primary">
          /me
        </Button>
        <Button type="submit" variant="primary" onClick={HandleLogout}>
          Logout
        </Button>
      </div>

      <Modal show={ShowRegister} onHide={handleClose}>
        <Form onSubmit={handleRegisterSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>REGISTRAZIONE</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={HandleChange}
                required
              ></Form.Control>
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                type="text"
                name="surname"
                onChange={HandleChange}
              ></Form.Control>
              <Form.Label>e-mail</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={HandleChange}
                required
              ></Form.Control>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={HandleChange}
                required
              ></Form.Control>
              <Form.Label>Data di nascita</Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                onChange={HandleChange}
              ></Form.Control>
              <Form.Group controlId="fileProPic" className="mb-3">
                <Form.Label>Immagine di profilo</Form.Label>
                <Form.Control type="file" onChange={handlePicture} />
              </Form.Group>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Registrati
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Home;
