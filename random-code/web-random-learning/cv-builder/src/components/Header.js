/*--------------------------------------------------------------*/

import React from "react";
import styled from "styled-components";

/*--------------------------------------------------------------*/

import bgImg from "../assets/images/svg.png";

/*--------------------------------------------------------------*/

const Header = () => {
  /*--------------------------------------------------------------*/

  return (
    <HeaderContainer
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
    >
      Create Your Own Resume
    </HeaderContainer>
  );
};

/*--------------------------------------------------------------*/
export default Header;
/*--------------------------------------------------------------*/

const HeaderContainer = styled.div`
  height: 180px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: ${({ theme }) => theme.fonts.mainHeaderFont};
  text-transform: uppercase;
  font-size: 4rem;

  color: ${({ theme }) => theme.colors.darkGray};
  background-color: ${({ theme }) => theme.colors.lightGray};

  background-position: "center";
  background-size: 100vw 26vh;
  background-repeat: "no-repeat";
`;
