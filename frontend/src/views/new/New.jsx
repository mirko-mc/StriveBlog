import React, { useCallback, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { PostNewBlogPost, PostPicture } from "../../data/fetch";

const NewBlogPost = (props) => {
  const [text, setText] = useState("");
  const handleChange = useCallback((value) => {
    setText(draftToHtml(value));
    console.log(text);
    // console.log(convertToRaw(value.getCurrentContent()))
    setFormValue({ ...formValue, content: draftToHtml(value) });
  });
  const initialFormValue = {
    category: "",
    title: "",
    cover: "https://picsum.photos/1000/300",
    readTime: "",
    author: "",
    content: "",
  };
  const [formValue, setFormValue] = useState(initialFormValue);
  /** fD conterrà l'immagine da passare alla fetch */
  const [fD, setFD] = useState(new FormData())
  const handlePicture = (e) => {
    setFD(prev => {
      // !!! svuoto il formData
      prev.delete("cover")
      // !!! inserisco l'immagine nel formData
      prev.append("cover", e.target.files[0])
      return prev;
    })
  }
  const handleChangeFormValue = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    // !!! attendo che il blogPost venga salvato
    const BlogPost = await PostNewBlogPost(formValue);
    // !!! aggiungo la cover al post
    await PostPicture("cover", BlogPost.id, fD)
    // !!! restituisco il messaggio di blogPost salvato
    alert("BlogPost salvato con successo")
    // !!! ritorno alla home
  };
  return (
    <Container className="new-blog-container">
      <Form onSubmit={handleSubmit} className="mt-5">


        <Form.Group controlId="fileCover" className="mb-3">
          <Form.Label>Immagine del post</Form.Label>
          <Form.Control type="file" onChange={handlePicture}/>
        </Form.Group>


        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control
            name="title"
            onChange={(e) => handleChangeFormValue(e)}
            size="lg"
            placeholder="Title"
          />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            size="lg"
            as="select"
            name="category"
            onChange={(e) => handleChangeFormValue(e)}
          >
            <option>Categoria 1</option>
            <option>Categoria 2</option>
            <option>Categoria 3</option>
            <option>Categoria 4</option>
            <option>Categoria 5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Contenuto Blog</Form.Label>

          <Editor
            value={text}
            onChange={handleChange}
            className="new-blog-content"
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
            onClick={() => PostNewBlogPost(formValue)}
          >
            Invia
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
