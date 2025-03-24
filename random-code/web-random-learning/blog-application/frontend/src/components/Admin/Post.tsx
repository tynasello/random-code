/*--------------------------------------------------------------*/

import React, { SyntheticEvent, useEffect, useState } from "react";
import styled from "styled-components";

import { Form } from "../Utils/Form";
import { Input } from "../Utils/Input";
import { TextInput } from "../Utils/TextInput";
import { Button } from "../Utils/Button";
import { ModalContainer } from "../Utils/ModalContainer";

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
  const [comments, setComments] = useState<[]>([]);

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

  // Handle delete comment button onClick
  const handleDeleteComment = async (commentId: string) => {
    try {
      // DELETE
      // Pass x-access-token token from localStorage for user authentication
      // Delete comment of current post by id
      await fetch(
        `https://tynasello-blog-api.herokuapp.com/blog/posts/${id}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "x-access-token": localStorage.getItem("token") || " ",
          },
        }
      );
      // Reload window to see comment deleted immediately
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  /*--------------------------------------------------------------*/

  // Handle post update form submit
  const handePostUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      // PATCH
      // Update post by id
      // Pass x-access-token token from localStorage for user authentication
      // Pass title,author, and text as body contents
      await fetch(`https://tynasello-blog-api.herokuapp.com/blog/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token") || " ",
        },
        body: JSON.stringify({ title: title, author_name: author, text: text }),
      });

      // Reload window to see post updated immediately
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

      <ModalContainer buttonText="Edit Post">
        <PostTitle>Edit Blog Post</PostTitle>
        <br />
        <Form onSubmit={handePostUpdate}>
          {/* -------------------------------------------------------------- */}

          <p>Post Title:</p>
          <Input
            type="text"
            value={title}
            onChange={(e: any) => {
              setTitle(e.target.value);
            }}
          ></Input>

          {/* -------------------------------------------------------------- */}

          <p>Author Name:</p>
          <Input
            type="text"
            value={author}
            onChange={(e: any) => {
              setAuthor(e.target.value);
            }}
          ></Input>

          {/* -------------------------------------------------------------- */}

          <p>Content:</p>
          <TextInput
            type="text"
            value={text}
            onChange={(e: any) => {
              setText(e.target.value);
            }}
          ></TextInput>

          {/* -------------------------------------------------------------- */}

          <Button value="Submit">Confirm Edit</Button>
        </Form>
      </ModalContainer>

      {/* -------------------------------------------------------------- */}

      <CommentsContainer>
        <CommentsHeader>Comments</CommentsHeader>

        {/* -------------------------------------------------------------- */}

        {comments &&
          comments.map((comment: Comment) => {
            // If there are comments map each once to a CommentDiv styled div with appropriate author text and button elements
            // Pass args, which contains only the comment id, to the Button component.
            // args will be passed into the onClick method of the Button component
            const args = [];
            args.push(comment._id);
            return (
              <CommentDiv key={comment._id}>
                <CommentAuthor>{comment.author_name}</CommentAuthor>
                <CommentText>{comment.text}</CommentText>
                <Button onClick={handleDeleteComment} args={args}>
                  Delete Comment
                </Button>
              </CommentDiv>
            );
          })}

        {/* -------------------------------------------------------------- */}
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

const PostTitle = styled.h3``;
