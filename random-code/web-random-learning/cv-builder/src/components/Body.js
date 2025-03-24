/*--------------------------------------------------------------*/

import React, { useState, useRef } from "react";
import styled from "styled-components";
import { v4 } from "uuid";
import { useReactToPrint } from "react-to-print";

/*--------------------------------------------------------------*/

import CVForm from "./CV/CVForm/CVForm";
import CVTemplate from "./CV/CVTemplate/CVTemplate";

/*--------------------------------------------------------------*/

import emptyCV from "../utils/emptyCV";
import exampleCV from "../utils/exampleCv";

/*--------------------------------------------------------------*/

const Body = () => {
  // CV object holds all information for the CV
  const [cv, setCv] = useState(emptyCV);

  /*--------------------------------------------------------------*/

  function sectionChange(e, sectionType, id) {
    /*----------------------------------------------------------------

    Update personalInfo section of CV at name with new value

    ----------------------------------------------------------------*/
    if (!sectionType) {
      let { name, value } = e.target;
      if (name === "skills") {
        value = value.split(",");
      }
      setCv((prevState) => ({
        ...prevState,
        personalInfo: {
          ...prevState.personalInfo,
          [name]: value,
        },
      }));
      return;
    }

    /*----------------------------------------------------------------

    Changing Value in Section Element

    ----------------------------------------------------------------*/
    const { name, value } = e.target;

    const newSection = cv[sectionType].map((el) => {
      if (el.id === id) {
        return { ...el, [name]: value };
      }
      return el;
    });
    setCv((prevState) => ({
      ...prevState,
      [sectionType]: [...newSection],
    }));
  }

  /*----------------------------------------------------------------

  Deleting Section Element

  ----------------------------------------------------------------*/
  function deleteSection(changedEl, section) {
    const newSection = [];
    cv[section].forEach((sectionEl) => {
      if (sectionEl === changedEl) {
        return;
      }
      newSection.push(sectionEl);
    });
    setCv((prevState) => ({
      ...prevState,
      [section]: [...newSection],
    }));
  }

  /*----------------------------------------------------------------

  Adding Section Element

  ----------------------------------------------------------------*/
  function addSection(sectionType) {
    if (sectionType === "education") {
      setCv((prevState) => ({
        ...prevState,
        education: [
          ...prevState.education,
          {
            id: v4(),
            degree: "",
            date: "",
          },
        ],
      }));
    } else if (sectionType === "work") {
      setCv((prevState) => ({
        ...prevState,
        work: [
          ...prevState.work,
          {
            id: v4(),
            position: "",
            date: "",
            desc: "",
          },
        ],
      }));
    } else if (sectionType === "projects") {
      setCv((prevState) => ({
        ...prevState,
        projects: [
          ...prevState.projects,
          {
            id: v4(),
            projectTitle: "",
            date: "",
            desc: "",
          },
        ],
      }));
    }
  }

  /*----------------------------------------------------------------

  Displaying Empty and Example CVs to CVTemplate

  ----------------------------------------------------------------*/

  function switchFormStyle(switchTo) {
    if (switchTo === "emptyCV") {
      setCv(() => emptyCV);
    } else {
      setCv(() => exampleCV);
    }
  }

  /*----------------------------------------------------------------

  Changing Colors on CVTemplate

  ----------------------------------------------------------------*/

  function changeTemplateColor(color, type) {
    setCv((prevState) => ({
      ...prevState,
      [type]: color,
    }));
  }

  /*----------------------------------------------------------------

  Exporting as PDF

  ----------------------------------------------------------------*/

  const ref = useRef();

  const exportPDF = useReactToPrint({ content: () => ref.current });

  /*----------------------------------------------------------------

  Handling File Input ( For Uploading Profile Image )

  ----------------------------------------------------------------*/

  function handleFileInput(e) {
    const profileImg = e.target.files[0];
    if (!profileImg) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setCv((prevState) => ({
        ...prevState,
        personalInfo: {
          ...prevState.personalInfo,
          profileImg: fileReader.result,
        },
      }));
    };
    fileReader.readAsDataURL(profileImg);
  }

  /*----------------------------------------------------------------
  ----------------------------------------------------------------*/

  return (
    <BodyContainer>
      {/* ---------------------------------------------------------------- */}

      <CVForm
        cv={cv}
        sectionChange={sectionChange}
        deleteSection={deleteSection}
        addSection={addSection}
        switchFormStyle={switchFormStyle}
        changeTemplateColor={changeTemplateColor}
        exportPDF={exportPDF}
        handleFileInput={handleFileInput}
      ></CVForm>

      {/* ---------------------------------------------------------------- */}

      <CVTemplate cv={cv} ref={ref}></CVTemplate>

      {/* ---------------------------------------------------------------- */}
    </BodyContainer>
  );
};

/*--------------------------------------------------------------*/
export default Body;
/*--------------------------------------------------------------*/

const BodyContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.lightGray};
  min-width: 770px;

  & > * {
    width: 750px;
    margin: 3rem 1.5rem;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
  @media screen and (max-width: 1500px) {
    flex-direction: column;
    align-items: center;
  }
`;
