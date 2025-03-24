/*--------------------------------------------------------------*/

import React, { SyntheticEvent, useEffect, useState } from "react";
import styled from "styled-components";

import { Button } from "../Utils/Button";
import { Form } from "../Utils/Form";
import { Input } from "../Utils/Input";
import { TextInput } from "../Utils/TextInput";

/*--------------------------------------------------------------*/

interface PostProps {}

interface Comment {
  author_name: string;
  date: string;
  parent_post_id: string;
  text: string;
  _id: string;
}

/*--------------------------------------------------------------*/
export const Post: React.FC<PostProps> = () => {
  // All comments in db
  const [comments, setComments] = useState<[]>([]);
  // New comment author and text
  const [newCommentAuthor, setNewCommentAuthor] = useState("");
  const [newCommentText, setNewCommentText] = useState("");

  const id = window.location.hash.split("/").pop();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");

  /*--------------------------------------------------------------*/

  // Run effect and clean up on mount, unmount, and when id changes
  useEffect(() => {
    (async () => {
      try {
        // GET
        // Get post in db by id
        const req = await fetch(
          `https://tynasello-blog-api.herokuapp.com/blog/posts/${id}`,
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
        result = result.post;

        // Set all post atrribute variables
        setTitle(result.title);
        setText(result.text);
        setAuthor(result.author_name);
        setDate(result.date);
      } catch (err) {
        console.log(err);
      }
      try {
        // GET
        // Get all of the comments of current blog post
        const req = await fetch(
          `https://tynasello-blog-api.herokuapp.com/blog/posts/${id}/comments`,
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
        // Get values from result and set comments equal to the first index of said values
        const commentsArr: any = Object.values(result);
        setComments(commentsArr[0]);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id]);
  /*--------------------------------------------------------------*/

  // Handle new comment form submit
  const handleNewComment = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      // POST
      // Pass newCommentText, and newCommentAuthor as body contents
      await fetch(
        `https://tynasello-blog-api.herokuapp.com/blog/posts/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: newCommentText,
            author_name: newCommentAuthor,
          }),
        }
      );
      // Reload window to display new comment
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  /*--------------------------------------------------------------*/

  return (
    <PostContainer>
      <Title>{title}</Title>
      <Author>{author}</Author>
      <Date>{date}</Date>
      <Text>{text}</Text>

      {/* -------------------------------------------------------------- */}

      <CommentsContainer>
        <CommentsHeader>Comments</CommentsHeader>

        {/* -------------------------------------------------------------- */}

        <NewCommentContainer>
          <Form onSubmit={handleNewComment}>
            {/* -------------------------------------------------------------- */}

            <p>Author Name:</p>
            <Input
              type="text"
              value={newCommentAuthor}
              onChange={(e: any) => {
                setNewCommentAuthor(e.target.value);
              }}
            ></Input>

            {/* -------------------------------------------------------------- */}

            <p>Text:</p>
            <TextInput
              type="text"
              value={newCommentText}
              onChange={(e: any) => {
                setNewCommentText(e.target.value);
              }}
            ></TextInput>

            {/* -------------------------------------------------------------- */}

            <Button value="Submit">Post Comment</Button>
          </Form>
        </NewCommentContainer>

        {/* -------------------------------------------------------------- */}

        {comments &&
          // If there are coments map each one to a CommentDiv component with CommentAuthor and CommentText styled divs
          comments.map((comment: Comment) => {
            return (
              <CommentDiv key={comment._id}>
                <CommentAuthor>{comment.author_name}</CommentAuthor>
                <CommentText>{comment.text}</CommentText>
              </CommentDiv>
            );
          })}
      </CommentsContainer>
    </PostContainer>
  );
};

/*--------------------------------------------------------------*/

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 50vw;
  margin: 3rem auto;

  & > * {
    padding: 0.4rem 0;
  }
`;
const Title = styled.h3`
  padding-bottom: 2rem;
`;
const Author = styled.h6``;
const Date = styled.h6``;
const Text = styled.p``;

const CommentsHeader = styled.h4`
  margin-top: 1rem;
`;
const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    padding: 0.4rem 0;
  }
`;
const CommentDiv = styled.div`
  background-color: ${({ theme }) => theme.colors.light};

  padding: 1rem;
  margin: 1.5rem 0;

  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 4px;

  & > * {
    padding: 0.2rem 0;
  }
`;
const CommentAuthor = styled.h6``;
const CommentText = styled.p`
  font-size: 0.9rem;
`;

const NewCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
