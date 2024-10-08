import { useParams } from "react-router-dom";
import { GetAllComments } from "../../data/fetch";
import { SingleComment } from "./SingleComment";
import { useEffect, useState } from "react";
import { AddComment } from "./AddComment";

export const CommentList = () => {
  console.log("comment => CommentList.jsx - CommentList");
  const [AllBlogPostComments, SetAllBlogPostComments] = useState();
  const Params = useParams();
  const HandleGetAllComments = async () => {
    GetAllComments(Params.blogPostId).then((data) =>
      SetAllBlogPostComments(data)
    );
  };
  useEffect(() => {
    !AllBlogPostComments && HandleGetAllComments();
  }, [AllBlogPostComments]);

  if (!AllBlogPostComments) return <p>Non ci sono commenti</p>;
  return (
    <>
      <AddComment />
      {AllBlogPostComments &&
        AllBlogPostComments.map((BlogPostComment) => (
          <SingleComment
            key={BlogPostComment._id}
            BlogPostComment={BlogPostComment}
          />
        ))}
    </>
  );
};
