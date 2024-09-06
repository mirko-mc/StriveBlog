import React from "react";
import { Col, Pagination, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";

const BlogList = (props) => {
  const { BlogPostsToRender } = props;
  return (
    <Row>
      {BlogPostsToRender?.data.map((blogPost) => (
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

      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />

        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Item>{BlogPostsToRender.page - 1}</Pagination.Item>
        <Pagination.Item active>{BlogPostsToRender.page}</Pagination.Item>
        <Pagination.Item>{BlogPostsToRender.page + 1}</Pagination.Item>
        <Pagination.Item disabled>{14}</Pagination.Item>

        <Pagination.Ellipsis />
        <Pagination.Item>{20}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </Row>
  );
};

export default BlogList;
