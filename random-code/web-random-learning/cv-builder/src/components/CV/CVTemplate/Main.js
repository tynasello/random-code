/*--------------------------------------------------------------*/

import React from "react";
import styled from "styled-components";

/*--------------------------------------------------------------*/

import Section from "../Utils/Section";
import Subsection from "../Utils/Subsection";
import Header from "./Header";

/*--------------------------------------------------------------*/

const Main = (cv) => {
  cv = cv.cv;

  /*--------------------------------------------------------------*/

  const workEls = cv.work.map((el) => (
    <Subsection key={el.id} title={el.position} subtitle={el.date}>
      {el.desc}
    </Subsection>
  ));

  /*--------------------------------------------------------------*/

  const projectEls = cv.projects.map((el) => (
    <Subsection key={el.id} title={el.projectTitle} subtitle={el.date}>
      {el.desc}
    </Subsection>
  ));

  /*--------------------------------------------------------------*/

  return (
    <MainContainer style={{ color: cv.mainFontColor }}>
      {/* ---------------------------------------------------------------- */}

      <Header first={cv.personalInfo.first} last={cv.personalInfo.last}>
        {cv.personalInfo.desc}
      </Header>

      {/* ---------------------------------------------------------------- */}

      <Section title="Work Experience">{workEls}</Section>

      {/* ---------------------------------------------------------------- */}

      <Section title="Projects">{projectEls}</Section>

      {/* ---------------------------------------------------------------- */}
    </MainContainer>
  );
};

/*--------------------------------------------------------------*/
export default Main;
/*--------------------------------------------------------------*/

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1rem;

  color: ${({ theme }) => theme.colors.gunmetal};
`;
