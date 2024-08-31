import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form, Modal, Row } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import {
  setRandomAuthors,
  GetAllBlogPosts,
  setRandomBlogPosts,
  PostLogin,
  PostNewAutor,
} from "../../data/fetch";
import { AuthorContext } from "../../context/AuthorContextProvider";

const Home = (props) => {
  const { Token, SetToken } = useContext(AuthorContext);
  /**
   * !!! refactorizzare dopo la modifica del frontend. la ricerca del blogPost era ben implementata nel backend ma la ripetevo nel frontend
   */
  const [AllBlogPosts, setAllBlogPosts] = useState({});
  const [BlogPostsToRender, setBlogPostsToRender] = useState([]);
  const { SearchBlogPost } = props;
  const [ShowLogin, SetShowLogin] = useState(false);
  const [ShowRegister, SetShowRegister] = useState(false);
  /** per gestire uso un ternario nella funzione per stabilire quale dei due modali chiudere */
  const handleClose = () => ShowLogin ? SetShowLogin(false) : SetShowRegister(false)
  const [formValue, setFormValue] = useState();
  const InitialFormValueLogin = {
    email: "",
    password: "",
  }
  const InitialFormValueRegister = {
    name: "",
    surname: "",
    email: "",
    password: "",
    birthDate: "",
    avatar: "",
    // "https://njhalloffame.org/wp-content/uploads/2021/04/generic-avatar-300x300.png",
  }
  const HandleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  useEffect(() => ShowLogin ? setFormValue(InitialFormValueLogin) : setFormValue(InitialFormValueRegister), [ShowLogin, ShowRegister])
  const handleLogin = async () => {
    const TokenObj = await PostLogin(formValue);
    localStorage.setItem("token", TokenObj.token);
    SetToken(TokenObj.token);
    handleClose();
  };
  const handleRegisterSubmit = async () => {
    // !!! attendo che l'autore venga salvato
    const CreatedAuthor = await PostNewAutor(formValue);
    console.log(CreatedAuthor);
    // !!! aggiungo l'avatar al post
    //* l'id è temporaneamente statico mentre non verrà implementato login e context dell'autore
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
  const handleRegister = () => { }
  const HandleGetAllBlogPosts = async () => {
    /** ESEGUO LA FETCH PER RECUPERARE TUTTI I BLOGPOSTS E LI INSERISCO NELLO STATO */
    const Posts = await GetAllBlogPosts(null, null, SearchBlogPost);
    return setAllBlogPosts(Posts);
  };

  /**
   * !!! SPOSTARE IL CARICAMENTO DEI POST IN BLOGLIST
   * */
  useEffect(() => {
    /** UTILIZZO DELLE FUNZIONI ASYNC PER POPOLARE LO STATO COSI' DA NON TRIGGERARE LO USEFFECT PRIMA CHE LA FETCH SIA COMPLETATA */
    HandleGetAllBlogPosts();
    // console.log("USE EFFECT => !AllBlogPosts?.data\n", !AllBlogPosts?.data);
    /** SE SIA ALLTHEBLOGPOSTS CHE SEARCHBLOGPOST SONO VALORIZZATI VUOL DIRE CHE L'UTENTE VUOLE EFFETTUARE UNA RICERCA... */
    // if (AllBlogPosts && SearchBlogPost) {
    //   /** ...ALLORA FILTRO I BLOGPOSTS SUL TITOLO PER RESTITUIRE SOLO I BLOGPOSTS CHE STA CERCANDO... */
    //   const FilteredBlogPosts = AllBlogPosts.data.filter((blogPost) =>
    //     blogPost.title.toLowerCase().includes(SearchBlogPost.toLowerCase())
    //   );
    /** ...E LI SETTO NELLO STATO DEI BLOGPOSTS DA RENDERIZZARE... */
    // setBlogPostsToRender(FilteredBlogPosts);
    // console.log("THEN\n", BlogPostsToRender);
    // } else {
    /** ...ALTRIMENTI SETTO TUTTI I BLOGPOSTS NELLO STATO DEI BLOGPOSTS DA RENDERIZZARE PERCHE' L'UTENTE NON STA EFFETTUANDO UNA RICERCA */
    // setBlogPostsToRender(AllBlogPosts?.data);
    // console.log("ELSE\n", BlogPostsToRender);
    // }
    /** AD USEEFFECT AGGANCIO SIA ALLBLOGPOSTS CHE SEARCHBLOGPOST AFFINCHE' LO STATO DEI BLOGPOSTS DA RENDERIZZARE SIA SEMPRE AGGIORNATO */
  }, [SearchBlogPost]);

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
      <Row className="justify-content-evenly">
        <Button onClick={setRandomAuthors}>Genera 20 autori casuali</Button>
        <Button onClick={setRandomBlogPosts}>Genera 20 post casuali</Button>
      </Row>
      {AllBlogPosts?.data && (
        <BlogList BlogPostsToRender={AllBlogPosts?.data} />
      )}
      {Token && <BlogList />}
      <div>
        <Button variant="primary" onClick={() => SetShowLogin(true)}>
          Login
        </Button>

        <Modal show={ShowLogin} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>LOGIN</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>email</Form.Label>
                <Form.Control
                  type="text"
                  // type="email"
                  name="email"
                  onChange={HandleChange}
                ></Form.Control>
                <Form.Label>password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={HandleChange}
                ></Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleLogin}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>



        <Button variant="primary" onClick={() => SetShowRegister(true)}>
          Registrati
        </Button>

        <Modal show={ShowRegister} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>REGISTRAZIONE</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" name="name" onChange={HandleChange} required></Form.Control>
                <Form.Label>Cognome</Form.Label>
                <Form.Control type="text" name="surname" onChange={HandleChange} required></Form.Control>
                <Form.Label>e-mail</Form.Label>
                <Form.Control
                  type="text"
                  // type="email"
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
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleRegister}>
              Registrati
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
};

export default Home;
