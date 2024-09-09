import { useContext, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { AuthorContext } from "../../context/AuthorContextProvider";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { DeleteAuthor, PutEditAuthor } from "../../data/fetch";

export const Me = () => {
  console.log("me => me.jsx");
  const { AuthAuthor } = useContext(AuthorContext);
  console.log(AuthAuthor);
  const Navigate = useNavigate();
  const [ShowDisabled, SetShowDisabled] = useState(true);
  const InitialAuthorFormValue = {
    email: AuthAuthor.email,
    name: AuthAuthor.name,
    surname: AuthAuthor.surname,
    birthDate: AuthAuthor.birthDate,
  };
  const [FormValue, SetFormValue] = useState(InitialAuthorFormValue);
  const HandlePutAuthor = async () => {
    await PutEditAuthor(AuthAuthor._id, FormValue);
    SetShowDisabled(true);
  };
  const HandleDeleteAuthor = async () => {
    // TODO cancella autore
    await DeleteAuthor(AuthAuthor._id);
    // TODO logout
    // TODO naviga alla home
    Navigate("/");
  };
  const HandleChange = (event) => {
    event.preventDefault();
    SetFormValue({ ...FormValue, [event.target.name]: event.target.value });
    console.log(FormValue);
  };
  if (AuthAuthor)
    return (
      <Container fluid="sm" className="mt-3">
        <Form>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={HandleChange}
              value={FormValue.name}
              disabled={ShowDisabled}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Cognome</Form.Label>
            <Form.Control
              type="text"
              name="surname"
              onChange={HandleChange}
              value={FormValue.surname}
              disabled={ShowDisabled}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Data di nascita</Form.Label>
            <Form.Control
              type="date"
              name="birthDate"
              onChange={HandleChange}
              value={FormValue.birthDate}
              disabled={ShowDisabled}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="fileProPic" className="mb-3">
            <Form.Label>Immagine di profilo</Form.Label>
            <img src={AuthAuthor.avatar} alt="Profile" />
          </Form.Group>
        </Form>
        <Row>
          {ShowDisabled && (
            <Button variant="primary" onClick={() => SetShowDisabled(false)}>
              Modifica dati
            </Button>
          )}
          {!ShowDisabled && (
            <Button variant="primary" onClick={HandlePutAuthor}>
              Salva modifiche
            </Button>
          )}
          <Button variant="primary" onClick={HandleDeleteAuthor}>
            Elimina account
          </Button>
        </Row>
      </Container>
    );
};
