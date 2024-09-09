import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { PostComment } from "../../data/fetch.js";
import { useParams } from "react-router-dom";
import { AuthorContext } from "../../context/AuthorContextProvider.jsx";
export const AddComment = () => {
  console.log("comment => AddComment.jsx - AddComment");
  const Params = useParams();
  const { AuthAuthor } = useContext(AuthorContext);
  const initialNewComment = {
    blogPostId: Params.blogPostId,
    authorId: AuthAuthor._id,
    content: "",
  };
  const [NewComment, SetNewComment] = useState(initialNewComment);
  const HandlePostComment = async () => {
    await PostComment(NewComment);
    SetNewComment(initialNewComment);
  };
  const handleChange = (event) => {
    SetNewComment({ ...NewComment, [event.target.name]: event.target.value });
  };
  return (
    <Form
      onSubmit={HandlePostComment}
      className="mb-3 d-flex flex-column align-items-center"
    >
      <Form.Group className="mb-3 w-100" controlId="ControlTextarea">
        <Form.Label>Commenti</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Inserisci un commento"
          rows={3}
          name="content"
          onChange={handleChange}
          // value={NewComment.content}
        />
      </Form.Group>

      <Button type="submit" className="w-25" variant="primary">
        Salva
      </Button>
    </Form>
  );
};
