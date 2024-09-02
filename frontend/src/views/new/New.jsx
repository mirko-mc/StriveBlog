import React, { useCallback, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { PostNewBlogPost, PatchPicture } from "../../data/fetch";

const NewBlogPost = (props) => {
  const [text, setText] = useState("");
  const handleChange = useCallback((value) => {
    setText(draftToHtml(value));
    setFormValue({ ...formValue, content: draftToHtml(value) });
  });
  const initialFormValue = {
    category: "",
    title: "",
    cover: "https://picsum.photos/1000/300",
    readTime: "",
    //* l'id è temporaneamente statico mentre non verrà implementato login e context dell'autore
    author: "66cf699c529613257f433d6d",
    content: "",
  };
  const [formValue, setFormValue] = useState(initialFormValue);
  /** fD conterrà l'immagine da passare alla fetch */
  const [fD, setFD] = useState(new FormData());
  const handlePicture = (e) => {
    setFD((prev) => {
      // svuoto il formData
      prev.delete("cover");
      // inserisco l'immagine nel formData
      prev.append("cover", e.target.files[0]);
      return prev;
    });
  };
  const handleChangeFormValue = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    // !!! attendo che il blogPost venga salvato
    const CreatedBlogPost = await PostNewBlogPost(formValue);
    console.log(CreatedBlogPost);
    // !!! aggiungo la cover al post
    //* l'id è temporaneamente statico mentre non verrà implementato login e context dell'autore
    fD.get("cover") && (await PatchPicture("cover", CreatedBlogPost._id, fD));
    console.log(fD);
    console.log(fD.get("cover"));
    // !!! restituisco il messaggio di blogPost salvato
    alert("BlogPost salvato con successo");
    // !!! ritorno alla home
  };
  return (
    <Container className="new-blog-container">
      <Form onSubmit={handleSubmit} className="mt-5">
        <Form.Group controlId="blog-form" className="mt-3 mb-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control
            name="title"
            onChange={(e) => handleChangeFormValue(e)}
            size="lg"
            placeholder="Title"
          />
        </Form.Group>

        <Form.Group controlId="fileCover" className="mb-3">
          <Form.Label>Immagine del post</Form.Label>
          <Form.Control type="file" onChange={handlePicture} />
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
            // type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
            onClick={handleSubmit}
          >
            Invia
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
