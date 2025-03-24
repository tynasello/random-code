/*--------------------------------------------------------------*/

import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { PostPreview } from "../../components/Public/PostPreview";

/*--------------------------------------------------------------*/

interface PublicPostsProps {}

interface Post {
  title: string;
  date: string;
  published: boolean;
  author_name: string;
  _id: string;
  text: string;
}

/*--------------------------------------------------------------*/

export const PublicPosts: React.FC<PublicPostsProps> = () => {
  // Posts array from db
  const [posts, setPosts] = useState([]);

  // Run effect and clean up only once (on mount and unmount)
  useEffect(() => {
    // (async()=>{})(); to get async function in useEffect
    (async () => {
      try {
        // GET
        // posts request to API
        const req = await fetch(
          `https://tynasello-blog-api.herokuapp.com/blog/posts`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        let result = await req.json();
        if (req.status !== 200) {
          return;
        }
        // Get values from result and set posts equal to the first index of said values
        const postsArr: any = Object.values(result);
        setPosts(postsArr[0]);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <PostsContainer>
      {/* -------------------------------------------------------------- */}

      {posts &&
        // If there are posts, map each post to a PostPreview component with appropriate props
        posts.map((post: Post) => {
          return (
            <PostPreview
              key={post._id}
              id={post._id}
              title={post.title}
              text={post.text}
              author={post.author_name}
              date={post.date}
            />
          );
        })}

      {/* -------------------------------------------------------------- */}
    </PostsContainer>
  );
};

const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 4rem;

  width: 70vw;
  margin: 0 auto;
  padding: 3rem 0;
`;
