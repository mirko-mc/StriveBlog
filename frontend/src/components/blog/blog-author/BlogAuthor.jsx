import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./styles.css";
import { GetSingleAuthor } from "../../../data/fetch";

const BlogAuthor = (props) => {
  console.log("blog => blog-author => BlogAuthor.jsx - BlogAuthor");
  const { AuthorId } = props;
  const [Author, SetAuthor] = useState({});
  const LoadAuthor = async () => {
    console.log(AuthorId);
    SetAuthor(await GetSingleAuthor(AuthorId));
  };
  useEffect(() => {
    AuthorId && LoadAuthor();
  }, [AuthorId]);
  if (Author)
    return (
      <Row>
        <Col xs={"auto"} className="pe-0">
          <Image className="blog-author" src={Author.avatar} roundedCircle />
        </Col>
        <Col>
          <div>di</div>
          <h6>
            {Author.name} {Author.surname}
          </h6>
        </Col>
      </Row>
    );
};

export default BlogAuthor;
