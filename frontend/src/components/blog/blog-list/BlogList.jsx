import React from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";

const BlogList = (props) => {
  const { BlogPostsToRender } = props;
  return (
    <Row>
      {BlogPostsToRender.map((blogPost) => (
        <Col
          key={blogPost._id}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={blogPost._id} {...blogPost} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
