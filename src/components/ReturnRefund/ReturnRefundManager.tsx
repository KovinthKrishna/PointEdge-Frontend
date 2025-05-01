import { Box, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReturnRefundButton from "./ReturnRefundButton";
import InvoiceModal from "./InvoiceModal";

const ReturnRefundManager: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();

  const handleInvoiceSubmit = async (invNumber: string) => {
    try {
      // Optionally validate invoice number via API
      await axios.get(`http://localhost:8080/api/returns/invoice/${invNumber}`);

      //Navigate to ReturnRefundPage with the invoice number as query param
      navigate(`/return-refund?invoice=${invNumber}`);

      onClose();
    } catch (error) {
      console.error("Error fetching invoice:", error);
      toast({
        title: "Error",
        description: "Invalid Invoice Number. Please try again!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <ReturnRefundButton
        onClick={onOpen}
        backgroundColor="#805AD5"
        color="white"
        _hover={{ backgroundColor: "#6B46C1" }}
      />
      {isOpen && (
        <InvoiceModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleInvoiceSubmit}
        />
      )}
    </Box>
  );
};

export default ReturnRefundManager;
