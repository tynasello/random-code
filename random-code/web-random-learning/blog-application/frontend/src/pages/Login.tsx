/*--------------------------------------------------------------*/

import React, { SyntheticEvent, useState } from "react";
import styled from "styled-components";

import { Form } from "../components/Utils/Form";
import { Input } from "../components/Utils/Input";
import { Button } from "../components/Utils/Button";

/*--------------------------------------------------------------*/

interface loginProps {
  setAuth: any;
}

/*--------------------------------------------------------------*/

const Login: React.FC<loginProps> = ({ setAuth }) => {
  // Username and password for user
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Handle login form submit
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      // POST
      // Log in request to API
      // Pass username and password as body contents
      const req = await fetch(
        `https://tynasello-blog-api.herokuapp.com/blog/log-in`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const result = await req.json();

      if (req.status === 200) {
        // If logged in successfully
        // Set token in localStorage equal to token recieved from POST request
        localStorage.setItem("token", result.token);
        localStorage.setItem("auth", "true");
        setAuth(true);
      } else {
        console.log(result);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <LoginContainer>
      <LoginHeader>Login Page</LoginHeader>

      {/* -------------------------------------------------------------- */}
      {/* 
        On submit run handleSubmit function 
        On change of any input values, set the corresponding variable equal to the event target value
      */}
      <Form onSubmit={handleSubmit}>
        {/* -------------------------------------------------------------- */}

        <p>Username: </p>
        <Input
          type="text"
          value={username}
          onChange={(e: any) => {
            setUsername(e.target.value);
          }}
        ></Input>

        {/* -------------------------------------------------------------- */}

        <p>Password:</p>
        <Input
          type="password"
          value={password}
          onChange={(e: any) => {
            setPassword(e.target.value);
          }}
        ></Input>

        {/* -------------------------------------------------------------- */}

        <Button value="Submit">Log In</Button>
      </Form>
    </LoginContainer>
  );
};
export default Login;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 30vw;
  margin: 0 auto;
`;
const LoginHeader = styled.h3`
  padding: 2rem 0;
`;
