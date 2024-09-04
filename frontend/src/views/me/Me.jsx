import { useContext } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { AuthorContext } from "../../context/AuthorContextProvider";
import "./styles.css";

export const Me = () => {
  console.log("me => me.jsx");
  const { AuthAuthor } = useContext(AuthorContext);
  const HandleChange = () => {};
  if (AuthAuthor)
    return (
      <Container fluid="sm" className="mt-3">
        <Form>
          {console.log(AuthAuthor)}
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={HandleChange}
              value={AuthAuthor.name}
              disabled
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Cognome</Form.Label>
            <Form.Control
              type="text"
              name="surname"
              onChange={HandleChange}
              value={AuthAuthor.surname}
              disabled
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>e-mail</Form.Label>
            <Form.Control
              type="text"
              // type="email"
              name="email"
              onChange={HandleChange}
              value={AuthAuthor.email}
              disabled
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={HandleChange}
              value={AuthAuthor.password}
              disabled
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Data di nascita</Form.Label>
            <Form.Control
              type="date"
              name="birthDate"
              onChange={HandleChange}
              value={AuthAuthor.birthDate}
              disabled
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="fileProPic" className="mb-3">
            <Form.Label>Immagine di profilo</Form.Label>
            <img src={AuthAuthor.avatar} alt="Profile" />
          </Form.Group>
          <Button variant="primary">Elimina account</Button>
        </Form>
      </Container>
    );
};
