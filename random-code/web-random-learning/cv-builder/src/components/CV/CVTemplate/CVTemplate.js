/*--------------------------------------------------------------*/

import React, { Component } from "react";
import styled from "styled-components";

/*--------------------------------------------------------------*/

import Sidebar from "./Sidebar";
import Main from "./Main";

/*--------------------------------------------------------------*/

class CVTemplate extends Component {
  render() {
    const { cv } = this.props;
    /*--------------------------------------------------------------*/

    return (
      <CVTemplateContainer>
        {/* ---------------------------------------------------------------- */}

        <Sidebar cv={cv}> </Sidebar>

        {/* ---------------------------------------------------------------- */}

        <Main cv={cv}> </Main>

        {/* ---------------------------------------------------------------- */}
      </CVTemplateContainer>
    );
  }
}

/*--------------------------------------------------------------*/
export default CVTemplate;
/*--------------------------------------------------------------*/

const CVTemplateContainer = styled.div`
  position: sticky;
  top: 0.5rem;
  overflow: hidden;

  display: grid;
  grid-template-columns: 1fr 2.4fr;

  height: 1056px;
  max-height: 1056px;

  background-color: ${({ theme }) => theme.colors.light};
  font-family: Roboto, sans-serif;
`;
