import { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { DeleteComment, PutComment } from "../../data/fetch.js";
import { useParams } from "react-router-dom";
import { AuthorContext } from "../../context/AuthorContextProvider.jsx";

export const SingleComment = ({ BlogPostComment }) => {
  console.log("comment => SingleComment.jsx - SingleComment");
  console.log(BlogPostComment);
  const { AuthAuthor } = useContext(AuthorContext);
  const Params = useParams();
  const blogPostId = Params.blogPostId;
  const [showSave, setShowSave] = useState(true);
  const InitialBlogPostCommentFormValue = {
    blogPostId,
    content: BlogPostComment.content,
    commentId: BlogPostComment._id,
  };
  const [EditFormValue, SetEditFormValue] = useState(
    InitialBlogPostCommentFormValue
  );
  const handleChangeComment = (event) => {
    event.preventDefault();
    SetEditFormValue({
      ...EditFormValue,
      [event.target.name]: event.target.value,
    });
    console.log(EditFormValue);
  };
  const HandlePutBlogPostComment = async () => {
    await PutComment(EditFormValue);
    setShowSave(true);
  };
  return (
    <Form>
      <Form.Group>
        <Form.Label>Commento di {BlogPostComment.author}</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="content"
          value={EditFormValue.content}
          onChange={handleChangeComment}
          disabled={showSave}
        />
      </Form.Group>
      {BlogPostComment.authorId === AuthAuthor._id && (
        <>
          <Row>
            <Col className="d-flex justify-content-around">
              <Button hidden={!showSave} onClick={() => setShowSave(false)}>
                MODIFICA COMMENTO
              </Button>
              <Button hidden={showSave} onClick={HandlePutBlogPostComment}>
                SALVA
              </Button>
              <Button
                type="submit"
                onClick={async () =>
                  await DeleteComment(blogPostId, BlogPostComment._id)
                }
              >
                ELIMINA COMMENTO
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Form>
  );
};
