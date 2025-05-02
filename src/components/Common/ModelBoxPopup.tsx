import React from "react";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import LeftArrowButton from "./LeftArrowButton"; // Your existing LeftArrowButton component

interface ModelBoxPopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; // accept children!
}

const ModelBoxPopup: React.FC<ModelBoxPopupProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const handleGoBack = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        maxW="80%"
        h="80%"
        borderRadius="8px"
        borderWidth="4px"
        borderColor="#003049"
        position="relative"
      >
        <LeftArrowButton onClick={handleGoBack} />
        {children} {/* render children inside */}
      </ModalContent>
    </Modal>
  );
};

export default ModelBoxPopup;
