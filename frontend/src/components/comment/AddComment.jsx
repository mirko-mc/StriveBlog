import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { PostComment } from "../../data/fetch.js";
import { useParams } from "react-router-dom";
export const AddComment = () => {
  console.log("comment => AddComment.jsx - AddComment");
  const Params = useParams();
  const initialNewComment = {
    comment: "",
    blogPostId: Params.BlogPostId
  }
  const [NewComment, SetNewComment] = useState(initialNewComment);
  const HandlePostComment = async () => {
    await PostComment(NewComment);
    SetNewComment(initialNewComment);
  };
  const handleChange = (event) => {
    SetNewComment({ ...NewComment, [event.target.name]: event.target.value });
    console.log(NewComment);
  };
  return (
    <Form onSubmit={HandlePostComment} className="mb-3 d-flex flex-column align-items-center">
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

      <Button type="submit" className="w-25" variant="primary">
        Salva
      </Button>
    </Form>
  );
};
