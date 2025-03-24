/*--------------------------------------------------------------*/

import React from "react";
import styled from "styled-components";
import { v4 } from "uuid";

/*--------------------------------------------------------------*/

import Section from "../Utils/Section";
import Subsection from "../Utils/Subsection";

/*--------------------------------------------------------------*/

import { FaLocationArrow } from "react-icons/fa";
import { DiWebplatform } from "react-icons/di";
import { AiFillPhone, AiTwotoneMail } from "react-icons/ai";

/*--------------------------------------------------------------*/

const Sidebar = (cv) => {
  cv = cv.cv;

  /*--------------------------------------------------------------*/

  const educationEls = cv.education.map((el) => (
    <Subsection key={el.id} title={el.degree} subtitle={el.date}>
      {el.school}
    </Subsection>
  ));

  /*--------------------------------------------------------------*/

  const skills = cv.personalInfo.skills.map((skill) => (
    <Subsection key={v4()}>
      <SkillElement
        style={{
          color: cv.sidebarFontColor,
          backgroundColor: cv.sidebarColor,
          borderColor: cv.sidebarFontColor,
        }}
      >
        {skill}
      </SkillElement>
    </Subsection>
  ));

  /*--------------------------------------------------------------*/

  return (
    <SidebarContainer
      style={{ backgroundColor: cv.sidebarColor, color: cv.sidebarFontColor }}
    >
      {/* ---------------------------------------------------------------- */}

      <ProfileImage
        src={cv.personalInfo.profileImg}
        alt="Default profile picture"
      ></ProfileImage>

      {/* ---------------------------------------------------------------- */}

      <Section title="Contact">
        {/* Location */}

        <Subsection>
          <FaLocationArrow style={{ marginRight: ".5rem" }} />{" "}
          {cv.personalInfo.location}
        </Subsection>

        {/* Phone number */}

        <Subsection>
          <AiFillPhone style={{ marginRight: ".5rem" }} />{" "}
          {cv.personalInfo.phone}
        </Subsection>

        {/* E-mail link */}

        <Subsection>
          <AiTwotoneMail style={{ marginRight: ".5rem" }} />{" "}
          {
            <a
              style={{
                color: cv.sidebarFontColor,
              }}
              href={"mailto:" + cv.personalInfo.eMail}
            >
              {cv.personalInfo.eMail}
            </a>
          }
        </Subsection>

        {/* Website Link */}

        <Subsection>
          <DiWebplatform style={{ marginRight: ".5rem" }} />{" "}
          {
            <a
              style={{
                color: cv.sidebarFontColor,
              }}
              href={"https://" + cv.personalInfo.website}
            >
              {cv.personalInfo.website}
            </a>
          }
        </Subsection>
      </Section>

      {/* ---------------------------------------------------------------- */}

      <Section title="Education">{educationEls}</Section>

      {/* ---------------------------------------------------------------- */}

      <Section title="Skills" content="skills">
        {skills}
      </Section>

      {/* ---------------------------------------------------------------- */}
    </SidebarContainer>
  );
};

/*--------------------------------------------------------------*/
export default Sidebar;
/*--------------------------------------------------------------*/

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 1056px;
  max-height: 1056px;
  padding: 1rem;

  color: ${({ theme }) => theme.colors.light};
`;
const ProfileImage = styled.img`
  align-self: center;
  width: 150px;
  height: 150px;

  margin: 1rem;
  border-radius: 50%;
`;
const SkillElement = styled.div`
  padding: 0.4rem 0.4rem;

  border-radius: 5px;
  border: 1px solid;
`;
