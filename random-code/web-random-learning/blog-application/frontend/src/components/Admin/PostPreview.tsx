/*--------------------------------------------------------------*/

import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import styled from "styled-components";

import { Button } from "../Utils/Button";

/*--------------------------------------------------------------*/

interface PostProps {
  title: string;
  text: string;
  author: string;
  date: string;
  id: string;
}

/*--------------------------------------------------------------*/

export const PostPreview: React.FC<PostProps> = ({
  title,
  author,
  date,
  id,
}) => {
  // match with hold url for current page
  const match = useRouteMatch();

  /*--------------------------------------------------------------*/

  // When post is deleted all of its comments must first be deleted
  const handleDeletePostComments = async () => {
    try {
      // DELETE
      // Pass x-access-token token from localStorage for user authentication
      await fetch(
        `https://tynasello-blog-api.herokuapp.com/blog/posts/${id}/comments`,
        {
          method: "DELETE",
          headers: {
            "x-access-token": localStorage.getItem("token") || " ",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  /*--------------------------------------------------------------*/

  // Handle delete post button onClick
  const handleDeletePost = async () => {
    handleDeletePostComments();
    try {
      // DELETE
      // Pass x-access-token token from localStorage for user authentication
      await fetch(`https://tynasello-blog-api.herokuapp.com/blog/posts/${id}`, {
        method: "DELETE",
        headers: {
          "x-access-token": localStorage.getItem("token") || " ",
        },
      });

      // Reload window to see post removed immediately
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  /*--------------------------------------------------------------*/

  return (
    <PostContainer>
      <PostTitle>{title}</PostTitle>
      <PostAuthor>{author}</PostAuthor>
      <PostDate>{date}</PostDate>

      {/* -------------------------------------------------------------- */}

      <Link
        style={{ color: "#0ca1a1" }}
        to={{
          pathname: `${match.url}/posts/${id}`,
        }}
      >
        See More
      </Link>

      {/* -------------------------------------------------------------- */}

      <Button onClick={handleDeletePost}>Delete Post</Button>
    </PostContainer>
  );
};

/*--------------------------------------------------------------*/

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;

  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  & > * {
    padding: 0.3rem 0;
  }
`;
const PostTitle = styled.h3``;
const PostAuthor = styled.h6``;
const PostDate = styled.h6``;
