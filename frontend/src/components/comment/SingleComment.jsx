import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { DeleteComment, PutComment } from "../../data/fetch.js";

export const SingleComment = ({ BlogPostComment, handleSetComments }) => {
  console.log("comment => SingleComment.jsx - SingleComment");
  console.log(BlogPostComment);
  const [showSave, setShowSave] = useState(true);
  const [isFetching, setIsFetching] = useState({
    put: false,
    delete: false,
  });
  const [edit, setEdit] = useState({
    comment: BlogPostComment.content,
    id: BlogPostComment._id,
  });
  const handleChangeComment = (event) => {
    event.preventDefault();
    setEdit({ ...edit, [event.target.name]: event.target.value });
  };
  const handleSavePutComment = async (BlogPostCommentId) => {
    setIsFetching({ ...isFetching, put: true });
    await PutComment(BlogPostCommentId, edit).then(() => {
      setIsFetching({ ...isFetching, put: false });
      setShowSave(true);
    });
  };
  const handleDeleteComment = async (BlogPostCommentId) => {
    setIsFetching({ ...isFetching, delete: true });
    await DeleteComment(BlogPostCommentId);

    await handleSetComments(BlogPostCommentId);
    setIsFetching({ ...isFetching, delete: false });
  };
  return (
    <Form>
      <Form.Group>
        <Form.Label>Commento di {BlogPostComment.author}</Form.Label>
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
        onClick={() => handleSavePutComment(BlogPostComment._id)}
      >
        EDIT
      </Button>
      <Button onClick={() => handleDeleteComment(BlogPostComment._id)}>DELETE</Button>
    </Form>
  );
};
