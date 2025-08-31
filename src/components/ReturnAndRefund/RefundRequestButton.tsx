import React from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import RefundDetailsModal from "./RefundDetailsModal";

const RefundRequestsButton: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} bgColor="darkBlue" color="white">
        My Refund Requests
      </Button>
      <RefundDetailsModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default RefundRequestsButton;
