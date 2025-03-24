/*--------------------------------------------------------------*/

import React, { useEffect } from "react";
import styled from "styled-components";

/*--------------------------------------------------------------*/

/*----------------------------------------------------------------
Automatically updates height of textarea to fit all content
----------------------------------------------------------------*/

function autoGrow(elements) {
  elements.forEach((el) => {
    el.style.height = "0.8rem";
    el.style.height = el.scrollHeight + "px";
  });
}

/*--------------------------------------------------------------*/

const TextInput = ({ placeholder, onChange, name, value }) => {
  /*--------------------------------------------------------------*/
  // Effect hook to automatically adjust height of textarea as its content updates
  useEffect(() => {
    const elements = document.querySelectorAll(TextInputContainer);
    autoGrow(elements);
  });

  /*--------------------------------------------------------------*/

  return (
    <TextInputContainer
      placeholder={placeholder}
      onChange={(e) => onChange(e)}
      name={name}
      value={value}
    ></TextInputContainer>
  );
};

/*--------------------------------------------------------------*/
export default TextInput;
/*--------------------------------------------------------------*/

const TextInputContainer = styled.textarea`
  display: block;
  width: 100%;
  max-width: 100%;

  margin: 1rem 0;
  padding: 0.6rem 0.3rem;

  resize: none;
  overflow: hidden;

  border-radius: 5px;
  border: 1px solid grey;

  font-family: ${({ theme }) => theme.fonts.bodyFont};
`;
