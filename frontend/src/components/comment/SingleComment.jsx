import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { DeleteComment, PutComment } from "../../data/fetch.js";

export const SingleComment = ({ comment, handleSetComments }) => {
  console.log("comment => SingleComment.jsx - SingleComment");
  console.log(comment);
  const [showSave, setShowSave] = useState(true);
  const [isFetching, setIsFetching] = useState({
    put: false,
    delete: false,
  });
  const [edit, setEdit] = useState({
    comment: comment.content,
    id: comment._id,
  });
  const handleChangeComment = (event) => {
    event.preventDefault();
    setEdit({ ...edit, [event.target.name]: event.target.value });
  };
  const handleSavePutComment = async (asin) => {
    setIsFetching({ ...isFetching, put: true });
    await PutComment(asin, edit).then(() => {
      setIsFetching({ ...isFetching, put: false });
      setShowSave(true);
    });
  };
  const handleDeleteComment = async (asin) => {
    setIsFetching({ ...isFetching, delete: true });
    await DeleteComment(asin);

    await handleSetComments(asin);
    setIsFetching({ ...isFetching, delete: false });
  };
  return (
    <Form>
      <Form.Group>
        <Form.Label>Commento di {comment.author}</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="comment"
          value={edit.comment}
          onChange={handleChangeComment}
          disabled={showSave}
        />
      </Form.Group>

      <Button hidden={!showSave} onClick={() => setShowSave(false)}></Button>
      <Button
        hidden={showSave}
        onClick={() => handleSavePutComment(comment._id)}
      >
        EDIT
      </Button>
      <Button onClick={() => handleDeleteComment(comment._id)}>DELETE</Button>
    </Form>
  );
};
