import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { PostComment } from "../../data/fetch.js";
import { useParams } from "react-router-dom";
export const AddComment = () => {
  console.log("comment => AddComment.jsx - AddComment");
  const Params = useParams();
  // TODO far diventare un formvalue perchè la fetch nel body vuole l'oggetto
  const [NewComment, SetNewComment] = useState("");
  const HandlePostComment = async () => {
    await PostComment(Params.BlogPostId, NewComment);
    SetNewComment("");
  };
  const handleChange = (event) => {
    SetNewComment(event.target.value);
    console.log(NewComment);
  };
  return (
    <Form className="mb-3 d-flex flex-column align-items-center">
      <Form.Group className="mb-3 w-100" controlId="ControlTextarea">
        <Form.Label>Commenti</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          rows={3}
          name="comment"
          onChange={handleChange}
          // value={comment}
        />
      </Form.Group>

      <Button className="w-25" variant="primary" onClick={HandlePostComment}>
        Salva
      </Button>
    </Form>
  );
};
