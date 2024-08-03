import React from "react";
import { Col, Row } from "react-bootstrap";
import posts from "../../../data/posts.json";
import BlogItem from "../blog-item/BlogItem";

const BlogList = (props) => {
  const { AllBlogPosts } = props;
  return (
    <Row>
      {AllBlogPosts.map((blogPost, i) => (
        <Col
          key={`item-${i}`}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={blogPost.title} {...blogPost} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
