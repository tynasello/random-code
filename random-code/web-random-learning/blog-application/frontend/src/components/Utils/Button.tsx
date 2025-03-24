/*--------------------------------------------------------------*/

import React from "react";
import styled from "styled-components";

/*--------------------------------------------------------------*/

interface ButtonProps {
  type?: string;
  value?: string;
  onClick?: any;
  args?: any[];
  children?: any;
}

/*--------------------------------------------------------------*/

export const Button: React.FC<ButtonProps> = ({
  type,
  value,
  onClick,
  args = [],
  children,
}) => {
  // Render different button if there is an onClick method passed in props
  if (onClick) {
    return (
      <ButtonContainer value={value} onClick={() => onClick(...args)}>
        {children}
      </ButtonContainer>
    );
  }
  return <ButtonContainer value={value}>{children}</ButtonContainer>;
};

/*--------------------------------------------------------------*/

const ButtonContainer = styled.button`
  display: block;
  width: 100%;
  max-width: 170px;
  margin: 1rem 0;
  padding: 1rem 0.3rem;

  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.light};
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid grey;

  &:active {
    transform: scale(1.03);
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.main};
  }
`;
