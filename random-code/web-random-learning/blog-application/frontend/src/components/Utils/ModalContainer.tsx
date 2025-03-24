/*--------------------------------------------------------------*/

import React, { useState } from "react";
import styled from "styled-components";

import { Button } from "./Button";
import { Modal } from "./Modal";

/*--------------------------------------------------------------*/

interface ModalContainerProps {
  buttonText: string;
  children: any;
}

/*--------------------------------------------------------------*/

export const ModalContainer: React.FC<ModalContainerProps> = ({
  buttonText,
  children,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <ModalContainerDiv>
      <Button onClick={() => setModalOpen(true)}>{buttonText}</Button>

      <Modal isOpen={modalOpen} closeModal={() => setModalOpen(false)}>
        {children}
      </Modal>
    </ModalContainerDiv>
  );
};

/*--------------------------------------------------------------*/

const ModalContainerDiv = styled.div``;
