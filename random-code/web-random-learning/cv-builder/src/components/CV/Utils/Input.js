/*--------------------------------------------------------------*/
import React from "react";
import styled from "styled-components";
/*--------------------------------------------------------------*/

const Input = ({ placeholder, onChange, name, value }) => {
  /*--------------------------------------------------------------*/

  return (
    <InputContainer
      placeholder={placeholder}
      onChange={(e) => onChange(e)}
      name={name}
      value={value}
    ></InputContainer>
  );
};

/*--------------------------------------------------------------*/
export default Input;
/*--------------------------------------------------------------*/

const InputContainer = styled.input`
  display: block;
  width: 100%;

  margin: 1rem 0;
  padding: 0.6rem 0.3rem;

  border-radius: 5px;
  border: 1px solid grey;

  background-color: white;
  font-family: ${({ theme }) => theme.fonts.bodyFont};
`;
