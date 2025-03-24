/*--------------------------------------------------------------*/

import React from "react";
import styled from "styled-components";

/*--------------------------------------------------------------*/

import Input from "../Utils/Input";
import TextInput from "../Utils/TextInput";
import Button from "../Utils/Button";

/*--------------------------------------------------------------*/

const FormSectionElement = ({
  sectionType,
  sectionEl,
  sectionChange,
  deleteSection,
}) => {
  /*--------------------------------------------------------------*/

  let placeHolders = [];
  let nameValues = [];

  if (sectionType === "projects") {
    placeHolders = ["Project Title", "Date", "School"];
    nameValues = ["projectTitle", "date", "desc"];
  } else if (sectionType === "work") {
    placeHolders = ["Company / Position", "Date", "Description"];
    nameValues = ["position", "date", "desc"];
  } else if (sectionType === "education") {
    placeHolders = ["Degree", "Date", "School"];
    nameValues = ["degree", "date", "school"];
  }

  /*--------------------------------------------------------------*/

  return (
    <ElementContainer>
      {/* ---------------------------------------------------------------- */}

      <Input
        placeholder={placeHolders[0]}
        onChange={(e) => sectionChange(e, sectionType, sectionEl.id)}
        name={nameValues[0]}
        value={sectionEl[nameValues[0]]}
      ></Input>

      {/* ---------------------------------------------------------------- */}

      <Input
        placeholder={placeHolders[1]}
        onChange={(e) => sectionChange(e, sectionType, sectionEl.id)}
        name={nameValues[1]}
        value={sectionEl[nameValues[1]]}
      ></Input>

      {/* ---------------------------------------------------------------- */}

      <TextInput
        placeholder={placeHolders[2]}
        onChange={(e) => sectionChange(e, sectionType, sectionEl.id)}
        name={nameValues[2]}
        value={sectionEl[nameValues[2]]}
      ></TextInput>

      {/* ---------------------------------------------------------------- */}

      <Button deleteBtn onClick={deleteSection} args={[sectionEl, sectionType]}>
        Remove
      </Button>

      {/* ---------------------------------------------------------------- */}
    </ElementContainer>
  );
};

/*--------------------------------------------------------------*/
export default FormSectionElement;
/*--------------------------------------------------------------*/

const ElementContainer = styled.div``;
