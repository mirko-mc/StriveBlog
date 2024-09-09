import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import "./styles.css";
import {
  GetSingleBlogPost,
  PatchPicture,
  PostNewBlogPost,
} from "../../data/fetch";
import { CommentList } from "../../components/comment/CommentList";
import { AuthorContext } from "../../context/AuthorContextProvider";
import draftToHtml from "draftjs-to-html";
import { Editor } from "draft-js";
const Blog = (props) => {
  console.log("blog => Blog.jsx - Blog");
  const { AuthAuthor } = useContext(AuthorContext);
  const [Blog, SetBlog] = useState({});
  const [IsEditing, SetIsEditing] = useState({
    image: false,
    post: false,
  });
  const [Loading, SetLoading] = useState(true);
  const Params = useParams();
  const Navigate = useNavigate();
  const IsAuthor = Blog.author === AuthAuthor._id;
  useEffect(() => {
    GetSingleBlogPost(Params.blogPostId).then((data) => SetBlog(data));
    if (Blog) {
      SetBlog(Blog);
      SetLoading(false);
    } else {
      Navigate("/404");
    }
  }, []);
  console.log(Blog);
  //**************** */
  const handleChange = useCallback((value) => {
    setText(draftToHtml(value));
    setFormValue({ ...formValue, content: draftToHtml(value) });
  });
  const initialFormValue = {
    category: Blog.category,
    title: Blog.title,
    cover: Blog.cover,
    readTime: Blog.readTime,
    author: Blog.author,
    content: Blog.content,
  };
  console.log(initialFormValue);
  const [formValue, setFormValue] = useState(initialFormValue);
  const [text, setText] = useState(formValue.content);
  /** fD conterrà l'immagine da passare alla fetch */
  const [fD, setFD] = useState(new FormData());
  const handlePicture = async (e) => {
    setFD((prev) => {
      // svuoto il formData
      prev.delete("cover");
      // inserisco l'immagine nel formData
      prev.append("cover", e.target.files[0]);
      return prev;
    });
  };
  // fD.get("cover") && (await PatchPicture("cover", Params.blogPostId, fD));
  const handleChangeFormValue = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const HandleSubmit = async (event) => {
    console.log(formValue);
    // attendo che il blogPost venga salvato
    await PostNewBlogPost(formValue);
    // restituisco il messaggio di blogPost salvato
    alert("BlogPost salvato con successo");
  };
  //**************** */

  if (Loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="blog-details-root">
        <Container>
          {IsAuthor && !IsEditing.image ? (
            <Button onClick={() => SetIsEditing({ image: true })}>
              Modifica immagine
            </Button>
          ) : (
            <>
              <Button onClick={() => SetIsEditing({ image: false })}>
                Annulla
              </Button>
              <Button
                onClick={async () =>
                  fD.get("cover") &&
                  (await PatchPicture("cover", Params.blogPostId, fD))
                }
              >
                Salva
              </Button>
            </>
          )}
          {!IsEditing.image ? (
            <Image className="blog-details-cover mt-0" src={Blog.cover} fluid />
          ) : (
            <Form.Group controlId="fileCover" className="mb-3">
              <Form.Label>Immagine del post</Form.Label>
              <Form.Control type="file" onChange={handlePicture} />
            </Form.Group>
          )}
          {IsAuthor && !IsEditing.post ? (
            <Button onClick={() => SetIsEditing({ post: true })}>
              Modifica post
            </Button>
          ) : (
            <>
              <Button onClick={() => SetIsEditing({ post: false })}>
                Annulla
              </Button>
              <Button onClick={HandleSubmit}>Salva</Button>
            </>
          )}
          {!IsEditing.post ? (
            <>
              <h1 className="blog-details-title  mt-0">{Blog.title}</h1>
              <div className="blog-details-container">
                <div className="blog-details-author">
                  <BlogAuthor AuthorId={Blog.author} />
                </div>
                <div className="blog-details-info mb-3">
                  <div>{Blog.createdAt}</div>
                  {/* <div>{`lettura da ${blog.readTime.value} ${blog.readTime.unit}`}</div> */}
                  <div
                    style={{
                      marginTop: 20,
                    }}
                  >
                    <BlogLike defaultLikes={["123"]} onChange={console.log} />
                  </div>
                </div>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: Blog.content,
                }}
              ></div>
              <CommentList />
            </>
          ) : (
            <Form>
              <Form.Group controlId="blog-form" className="mt-3 mb-3">
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

                {/* <Editor
                  value={formValue.content}
                  onChange={handleChange}
                  className="new-blog-content"
                /> */}
              </Form.Group>
            </Form>
          )}
        </Container>
      </div>
    );
  }
};

export default Blog;
