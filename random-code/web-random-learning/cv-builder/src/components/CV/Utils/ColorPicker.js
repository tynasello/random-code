/*--------------------------------------------------------------*/

import React, { useState } from "react";
import styled from "styled-components";
import { BlockPicker } from "react-color";

/*--------------------------------------------------------------*/

const ColorPicker = ({ initialColor, changeTemplateColor, type }) => {
  const [color, setColor] = useState(initialColor);

  /*--------------------------------------------------------------*/

  return (
    <ColorPickerContainer>
      {/* ---------------------------------------------------------------- */}

      <BlockPicker
        color={color}
        onChangeComplete={(color) => {
          setColor(color.hex);
          changeTemplateColor(color.hex, type);
        }}
      />

      {/* ---------------------------------------------------------------- */}
    </ColorPickerContainer>
  );
};

/*--------------------------------------------------------------*/
export default ColorPicker;
/*--------------------------------------------------------------*/

const ColorPickerContainer = styled.div``;
