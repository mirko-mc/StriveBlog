import React from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import { MyFetch } from "../../components/MyFetch";

const Home = (props) => {
  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
      <MyFetch />
      <BlogList />
    </Container>
  );
};

export default Home;
