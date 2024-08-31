import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form, Modal, Row } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import {
  setRandomAuthors,
  GetAllBlogPosts,
  setRandomBlogPosts,
  PostLogin,
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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const HandleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    const TokenObj = await PostLogin(formValue);
    localStorage.setItem("token", TokenObj.token);
    SetToken(TokenObj.token);
    handleClose();
  };
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
        <Button variant="primary" onClick={handleShow}>
          Login
        </Button>

        <Modal show={show} onHide={handleClose}>
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
                  onChange={(e) => HandleChange(e)}
                ></Form.Control>
                <Form.Label>password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={(e) => HandleChange(e)}
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
      

      
        <Button variant="primary" onClick={handleShow}>
          Registrati
        </Button>

        <Modal show={show} onHide={handleClose}>
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
                  onChange={(e) => HandleChange(e)}
                ></Form.Control>
                <Form.Label>password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={(e) => HandleChange(e)}
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
      </div>
    </Container>
  );
};

export default Home;
