import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";
import { GetAllBlogPosts } from "../../../data/fetch";
import { BlogPagination } from "./BlogPagination";

const BlogList = (props) => {
  console.log("blog-list => BlogList.jsx - BlogList");
  const [BlogPostsToRender, SetBlogPostsToRender] = useState([]);
  const [Search, SetSearch] = useState("");
  const HandleSearch = async (event) => {
    SetSearch(!event.target.value ? "" : event.target.value);
  };
  useEffect(() => {
    GetAllBlogPosts(null, null, Search).then((data) =>
      SetBlogPostsToRender(data)
    );
  }, [Search]);
  return (
    <Row>
      <Form>
        <Form.Control
          type="text"
          name="search"
          onChange={HandleSearch}
          placeholder="Cerca..."
        />
      </Form>
      {BlogPostsToRender?.data &&
        BlogPostsToRender?.data.map((blogPost) => (
          <Col key={blogPost._id} md={4}>
            <BlogItem key={blogPost._id} {...blogPost} />
          </Col>
        ))}
      <BlogPagination />
    </Row>
  );
};

export default BlogList;
