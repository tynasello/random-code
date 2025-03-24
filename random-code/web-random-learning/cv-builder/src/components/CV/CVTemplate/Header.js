/*--------------------------------------------------------------*/

import React from "react";
import styled from "styled-components";

/*--------------------------------------------------------------*/

const Header = ({ first, last, professionalTitle, children }) => {
  /*--------------------------------------------------------------*/

  return (
    <SectionContainer>
      {/* ---------------------------------------------------------------- */}

      <Name>
        <FirstName>{first} </FirstName> {last}
      </Name>

      {/* ---------------------------------------------------------------- */}

      <ProfessionalTitle>{professionalTitle}</ProfessionalTitle>

      {/* ---------------------------------------------------------------- */}

      <Content>{children}</Content>

      {/* ---------------------------------------------------------------- */}
    </SectionContainer>
  );
};

/*--------------------------------------------------------------*/
export default Header;
/*--------------------------------------------------------------*/

const SectionContainer = styled.div``;
const Name = styled.div`
  display: flex;
  margin: 1rem;

  font-family: ${({ theme }) => theme.colors.headerFont};
  font-size: 3rem;
  text-transform: uppercase;
`;
const FirstName = styled.h3`
  margin-right: 0.5rem;

  font-size: 3rem;
  font-weight: bold;
`;
const ProfessionalTitle = styled.h3``;

const Content = styled.div`
  margin: 1rem;

  font-size: 0.8rem;
`;
