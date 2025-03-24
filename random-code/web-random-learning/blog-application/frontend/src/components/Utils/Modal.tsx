/*--------------------------------------------------------------*/

import React from "react";
import styled from "styled-components";
import { Button } from "./Button";
import ReactDom from "react-dom";

/*--------------------------------------------------------------*/

interface ModalProps {
  isOpen: boolean;
  closeModal: any;
  children?: any;
}

/*--------------------------------------------------------------*/

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  children,
}) => {
  // If the model is already open return null
  if (!isOpen) return null;

  // Using CreatePortal. Maintains the modals child parent relationships
  return ReactDom.createPortal(
    <>
      {/* Display overlay in background */}
      <Overlay />
      <ModalContainer>
        {children}
        <Button onClick={closeModal}>Close</Button>
      </ModalContainer>
    </>,
    document.getElementById("portal")!
  );
};

/*--------------------------------------------------------------*/

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.7);
`;
const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60vw;

  background-color: ${({ theme }) => theme.colors.light};

  padding: 50px;
  z-index: 5;
`;
