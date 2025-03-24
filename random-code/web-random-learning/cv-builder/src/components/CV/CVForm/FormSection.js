/*--------------------------------------------------------------*/

import React from "react";
import styled from "styled-components";

/*--------------------------------------------------------------*/

import Section from "../Utils/Section";
import FormSectionElement from "./FormSectionElement";
import Button from "../Utils/Button";

/*--------------------------------------------------------------*/

const FormSection = ({
  cv,
  formSectionInfo,
  sectionChange,
  deleteSection,
  addSection,
}) => {
  /*--------------------------------------------------------------*/

  let title = "";
  let args = [];
  let section = "";

  if (formSectionInfo === cv.projects) {
    title = "Project";
    args = ["projects"];
    section = "projects";
  } else if (formSectionInfo === cv.work) {
    title = "Work Experience";
    args = ["work"];
    section = "work";
  } else if (formSectionInfo === cv.education) {
    title = "Education";
    args = ["education"];
    section = "education";
  }

  /*--------------------------------------------------------------*/

  let sectionElements = [];
  formSectionInfo.forEach((sectionEl) => {
    sectionElements.push(
      <FormSectionElement
        sectionType={section}
        sectionEl={sectionEl}
        sectionChange={sectionChange}
        deleteSection={deleteSection}
        key={sectionEl.id}
      ></FormSectionElement>
    );
  });

  /*--------------------------------------------------------------*/

  return (
    <FormSectionContainer>
      <Section title={title}>
        {sectionElements}
        <Button addBtn onClick={addSection} args={args} section={section}>
          Add
        </Button>
      </Section>
    </FormSectionContainer>
  );
};

/*--------------------------------------------------------------*/
export default FormSection;
/*--------------------------------------------------------------*/

const FormSectionContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0 1rem;

  color: ${({ theme }) => theme.colors.gunmetal};
`;
