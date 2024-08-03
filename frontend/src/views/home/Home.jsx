import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import { GetAllBlogPosts } from "../../data/fetch";

const Home = (props) => {
  const [AllBlogPosts, setAllBlogPosts] = useState(null);
  const { searchBlogPost } = props;
  console.log(searchBlogPost);
  console.log(!searchBlogPost);

  const HandleGetAllBlogPosts = async () => {
    // return await GetAllBlogPosts().then((data) => setAllBlogPosts(data));
    return setAllBlogPosts(await GetAllBlogPosts());
  };
  useEffect(() => {
    !AllBlogPosts && HandleGetAllBlogPosts();
    console.log(AllBlogPosts.data);
    // agginugere for of o for each per effettuare la ricerca
    // !searchBlogPost &&
    //   AllBlogPosts.data.title.includes(searchBlogPost) &&
    //   console.log(AllBlogPosts.data.title);
  }, [AllBlogPosts]);
  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
      {AllBlogPosts && <BlogList AllBlogPosts={AllBlogPosts.data} />}
    </Container>
  );
};

export default Home;
