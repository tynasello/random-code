/*--------------------------------------------------------------*/

import React, { useEffect } from "react";
import styled from "styled-components";

/*--------------------------------------------------------------*/

/*----------------------------------------------------------------
Automatically updates height of textarea to fit all content
----------------------------------------------------------------*/

function autoGrow(elements: NodeListOf<Element>) {
  elements.forEach((el: any) => {
    el.style.height = "0.8rem";
    el.style.height = el.scrollHeight + "px";
  });
}

/*--------------------------------------------------------------*/

interface TextInputProps {
  type?: string;
  value?: string;
  onChange: any;
}

/*--------------------------------------------------------------*/

export const TextInput: React.FC<TextInputProps> = ({ value, onChange }) => {
  /*--------------------------------------------------------------*/
  // Effect hook to automatically adjust height of textarea as its content updates
  useEffect(() => {
    const elements: NodeListOf<Element> =
      document.querySelectorAll(TextAreaContainer);
    autoGrow(elements);
  });

  /*--------------------------------------------------------------*/

  return (
    <TextAreaContainer
      onChange={(e) => onChange(e)}
      value={value}
    ></TextAreaContainer>
  );
};

/*--------------------------------------------------------------*/

const TextAreaContainer = styled.textarea`
  margin: 0.4rem 0;
  padding: 0.2rem 0.4rem;

  background-color: ${({ theme }) => theme.colors.light};
  border: 1px solid ${({ theme }) => theme.colors.darkGray};
  border-radius: 4px;
`;
