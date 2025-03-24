/*--------------------------------------------------------------*/

import React from "react";
import styled from "styled-components";

/*--------------------------------------------------------------*/

interface FormProps {
  onSubmit: any;
  children: any;
}

/*--------------------------------------------------------------*/

export const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  return (
    <FormContainer
      onSubmit={(e) => {
        onSubmit(e);
      }}
    >
      {children}
    </FormContainer>
  );
};

/*--------------------------------------------------------------*/

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  & > * > * {
    padding: 0.2rem 0;
  }
`;
