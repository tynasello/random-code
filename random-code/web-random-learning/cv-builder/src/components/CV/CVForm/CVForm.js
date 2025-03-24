/*--------------------------------------------------------------*/

import React from "react";
import styled from "styled-components";

/*--------------------------------------------------------------*/

import PersonalInfo from "./PersonalInfo";
import Section from "../Utils/Section";
import FormSection from "./FormSection";
import Button from "../Utils/Button";
import ColorPicker from "../Utils/ColorPicker";

/*--------------------------------------------------------------*/

const CVForm = ({
  cv,
  sectionChange,
  deleteSection,
  addSection,
  switchFormStyle,
  changeTemplateColor,
  exportPDF,
  handleFileInput,
}) => {
  /*--------------------------------------------------------------*/

  return (
    <CVFormContainer>
      {/* ---------------------------------------------------------------- */}

      <PersonalInfo
        personalInfo={cv.personalInfo}
        sectionChange={sectionChange}
        handleFileInput={handleFileInput}
      ></PersonalInfo>

      {/* ---------------------------------------------------------------- */}

      <FormSection
        cv={cv}
        formSectionInfo={cv.education}
        sectionChange={sectionChange}
        deleteSection={deleteSection}
        addSection={addSection}
      ></FormSection>

      {/* ---------------------------------------------------------------- */}

      <FormSection
        cv={cv}
        formSectionInfo={cv.work}
        sectionChange={sectionChange}
        deleteSection={deleteSection}
        addSection={addSection}
      ></FormSection>

      {/* ---------------------------------------------------------------- */}

      <FormSection
        cv={cv}
        formSectionInfo={cv.projects}
        sectionChange={sectionChange}
        deleteSection={deleteSection}
        addSection={addSection}
      ></FormSection>

      {/* ---------------------------------------------------------------- */}
      {/* Section for main buttons -> switching between example and empty CV, and exporting as PDF */}

      <Section>
        <Button addBtn onClick={switchFormStyle} args={["emptyCV"]}>
          Display Empty CV
        </Button>
        <Button addBtn onClick={switchFormStyle} args={["exampleCV"]}>
          Display Example CV
        </Button>
        <Button addBtn onClick={exportPDF}>
          Export as PDF
        </Button>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Section at bottom of form for changing CV colors. */}

      <Section title="Color Picker"></Section>
      <ColorPickerSection>
        <ColorPickerItem>
          <h3>Sidebar Color</h3>
          <br />
          <ColorPicker
            initialColor={cv.sidebarColor}
            changeTemplateColor={changeTemplateColor}
            type="sidebarColor"
          ></ColorPicker>
        </ColorPickerItem>

        {/* ---------------------------------------------------------------- */}

        <ColorPickerItem>
          <h3>Font Color (Main)</h3>
          <br />
          <ColorPicker
            initialColor={cv.mainFontColor}
            changeTemplateColor={changeTemplateColor}
            type="mainFontColor"
          ></ColorPicker>
        </ColorPickerItem>

        {/* ---------------------------------------------------------------- */}

        <ColorPickerItem>
          <h3>Font Color (Sidebar)</h3>
          <br />
          <ColorPicker
            initialColor={cv.sidebarFontColor}
            changeTemplateColor={changeTemplateColor}
            type="sidebarFontColor"
          ></ColorPicker>
        </ColorPickerItem>
      </ColorPickerSection>

      {/* ---------------------------------------------------------------- */}
    </CVFormContainer>
  );
};

/*--------------------------------------------------------------*/
export default CVForm;
/*--------------------------------------------------------------*/

const CVFormContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.light};
  font-family: Roboto, sans-serif;
`;
const ColorPickerSection = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-bottom: 4rem;

  font-size: 0.8rem;
  text-align: center;
`;
const ColorPickerItem = styled.div`
  padding: 1rem 2rem;
`;
