import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import "./styles.css";
import { GetSingleBlogPost } from "../../data/fetch";
import { CommentArea } from "../../components/comment/CommentArea";
import { CommentList } from "../../components/comment/CommentList";
const Blog = (props) => {
  console.log("blog => Blog.jsx - Blog");
  const [Blog, SetBlog] = useState({});
  const [Loading, SetLoading] = useState(true);
  const Params = useParams();
  const Navigate = useNavigate();
  useEffect(() => {
    GetSingleBlogPost(Params.blogPostId).then((data) => SetBlog(data));
    if (Blog) {
      SetBlog(Blog);
      SetLoading(false);
    } else {
      Navigate("/404");
    }
  }, []);

  if (Loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="blog-details-root">
        <Container>
          <Image className="blog-details-cover" src={Blog.cover} fluid />
          <h1 className="blog-details-title">{Blog.title}</h1>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor AuthorId={Blog.author} />
            </div>
            <div className="blog-details-info">
              <div>{Blog.createdAt}</div>
              {/* <div>{`lettura da ${blog.readTime.value} ${blog.readTime.unit}`}</div> */}
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <BlogLike defaultLikes={["123"]} onChange={console.log} />
              </div>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: Blog.content,
            }}
          ></div>
          {/* <CommentArea /> */}
          <CommentList />
        </Container>
      </div>
    );
  }
};

export default Blog;
