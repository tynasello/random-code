/*--------------------------------------------------------------*/

import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import styled from "styled-components";

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
  text,
  author,
  date,
  id,
}) => {
  // match will hold url for current page
  const match = useRouteMatch();
  return (
    <PostContainer>
      <PostTitle>{title}</PostTitle>
      <PostAuthor>{author}</PostAuthor>
      <PostDate>{date}</PostDate>
      <Link
        style={{ color: "#75B9BE" }}
        // Link is to the current url / the id corresponding to a particular post
        // Pass post attributes in through state key
        to={{
          pathname: `${match.url}/${id}`,
          state: { title, text, author, date, id },
        }}
      >
        See More
      </Link>
    </PostContainer>
  );
};

/*--------------------------------------------------------------*/

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    padding: 0.3rem 0;
  }
`;
const PostTitle = styled.h3``;
const PostAuthor = styled.h6``;
const PostDate = styled.h6``;
