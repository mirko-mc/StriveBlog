import { useContext, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { AuthorContext } from "../../context/AuthorContextProvider";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { DeleteAuthor, PatchPicture, PutEditAuthor } from "../../data/fetch";

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
  const [fD, setFD] = useState(new FormData());
  const HandlePutAuthor = async () => {
    await PutEditAuthor(AuthAuthor._id, FormValue);
    fD.get("avatar") && (await PatchPicture("avatar", AuthAuthor._id, fD));
    SetShowDisabled(true);
  };
  const HandleDeleteAuthor = async () => {
    // TODO cancella autore
    await DeleteAuthor(AuthAuthor._id);
    localStorage.removeItem("token");
    // TODO logout
    // TODO naviga alla home
    Navigate("/");
  };
  const HandleChange = (event) => {
    event.preventDefault();
    SetFormValue({ ...FormValue, [event.target.name]: event.target.value });
    console.log(FormValue);
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
  if (AuthAuthor)
    return (
      <Container fluid="sm" className="mt-3">
        <Col>
          <Card className="mb-3">
            <Row className="m-0">
              <Card.Header className="text-center">
                {AuthAuthor.name} {AuthAuthor.surname}
              </Card.Header>
              <Col md={4}>
                <Form.Group controlId="fileProPic" className="mb-3">
                  <img
                    src={AuthAuthor.avatar}
                    alt="Profile"
                    className="w-100 h-auto rounded-circle img-thumbnail"
                  />
                </Form.Group>
              </Col>
              <Col md={8}>
                <Card.Body>
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
                    <Form.Control type="file" onChange={handlePicture} />
                  </Form.Group>
                </Card.Body>
              </Col>
              <Card.Footer className="d-flex justify-content-evenly">
                {ShowDisabled && (
                  <Button
                    variant="primary"
                    onClick={() => SetShowDisabled(false)}
                  >
                    Modifica dati
                  </Button>
                )}
                {!ShowDisabled && (
                  <Button
                    type="submit"
                    variant="primary"
                    onClick={HandlePutAuthor}
                  >
                    Salva modifiche
                  </Button>
                )}
                <Button
                  type="submit"
                  variant="primary"
                  onClick={HandleDeleteAuthor}
                >
                  Elimina account
                </Button>
              </Card.Footer>
            </Row>
          </Card>
        </Col>
      </Container>
    );
};
