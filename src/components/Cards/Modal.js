import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #FFFFFF;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  color: black;
`;

const CloseButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  border: none;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border-radius: 4px;
  cursor: pointer;
`;

const Modal = ({ message, onClose }) => {
  return (
    <ModalContainer>
      <ModalContent>
        <p>{message}</p>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;