/*--------------------------------------------------------------*/

import React, { SyntheticEvent, useEffect, useState } from "react";
import styled from "styled-components";

import { PostPreview } from "../../components/Admin/PostPreview";

import { Form } from "../../components/Utils/Form";
import { Input } from "../../components/Utils/Input";
import { Button } from "../../components/Utils/Button";
import { TextInput } from "../../components/Utils/TextInput";
import { ModalContainer } from "../../components/Utils/ModalContainer";

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

export const AdminPosts: React.FC<PublicPostsProps> = () => {
  // Posts array from db
  const [posts, setPosts] = useState<[]>([]);

  // String variables for new title, text, and author
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  /*--------------------------------------------------------------*/

  // Run effect and clean up only once (on mount and unmount)
  useEffect(() => {
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

  /*--------------------------------------------------------------*/

  // Handle create post form submit
  const handlePostCreate = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      // POST
      // posts request to API
      // Pass x-access-token token from localStorage for user authentication
      // Pass newTitle,newAuthor, and newText as body contents
      await fetch(`https://tynasello-blog-api.herokuapp.com/blog/posts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token") || " ",
        },
        body: JSON.stringify({
          title: newTitle,
          author_name: newAuthor,
          text: newText,
        }),
      });

      // Reload window so new post appears
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  /*--------------------------------------------------------------*/

  return (
    <PostsPageContainer>
      {/* -------------------------------------------------------------- */}

      <PostsContainer>
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
      </PostsContainer>

      {/* -------------------------------------------------------------- */}

      <ModalContainer buttonText="Create New Post">
        {/* 
          On submit run handlePostCreate function 
          On change of any input values, set the corresponding variable equal to the event target value
        */}

        <Form onSubmit={handlePostCreate}>
          {/* -------------------------------------------------------------- */}

          <p style={{ margin: 0 }}>Post Title:</p>
          <Input
            type="text"
            value={newTitle}
            onChange={(e: any) => {
              setNewTitle(e.target.value);
            }}
          ></Input>

          {/* -------------------------------------------------------------- */}

          <p>Author:</p>
          <Input
            type="text"
            value={newAuthor}
            onChange={(e: any) => {
              setNewAuthor(e.target.value);
            }}
          ></Input>

          {/* -------------------------------------------------------------- */}

          <p>Text</p>
          <TextInput
            type="text"
            value={newText}
            onChange={(e: any) => {
              setNewText(e.target.value);
            }}
          ></TextInput>

          {/* -------------------------------------------------------------- */}

          <Button value="Submit">Confirm New Post</Button>
        </Form>
      </ModalContainer>

      {/* -------------------------------------------------------------- */}
    </PostsPageContainer>
  );
};
const PostsPageContainer = styled.div`
  width: 50vw;
  margin: 0 auto;
`;
const PostsContainer = styled.div`
  display: grid;
  grid-gap: 3rem;

  width: 50vw;
  margin: 0 auto;
  padding: 3rem 0;
`;
