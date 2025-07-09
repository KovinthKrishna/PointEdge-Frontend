import {
  Box,
  HStack,
  Icon,
  useDisclosure,
  useToast,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReturnRefundButton from "./ReturnRefundButton";
import InvoiceModal from "./InvoiceModal";
import { WarningIcon } from "@chakra-ui/icons";

const ReturnRefundManager: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();

  const handleInvoiceSubmit = async (invoiceNumber: string) => {
    try {
      // Validate invoice existence before navigating
      await axios.get(
        `http://localhost:8080/api/return-exchange/invoice/${invoiceNumber}`
      );

      // Navigate to ReturnRefundPage with invoice number as query param
      navigate(`/return-refund?invoice=${invoiceNumber}`);
      onClose();
    } catch (error) {
      console.error("Error fetching invoice:", error);
      toast({
        duration: 3000,
        isClosable: true,
        render: () => (
          <Box
            bg="darkBlue"
            color="white"
            px={4}
            py={3}
            borderRadius="md"
            boxShadow="lg"
            maxW="sm"
            mx="auto"
          >
            <HStack spacing={3}>
              <Icon as={WarningIcon} color="white" boxSize={5} />
              <Box>
                <Text fontWeight="bold" fontSize="md">
                  Error
                </Text>
                <Text fontSize="sm">
                  The invoice number you entered is invalid.
                </Text>
              </Box>
            </HStack>
          </Box>
        ),
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
      <InvoiceModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleInvoiceSubmit}
      />
    </Box>
  );
};

export default ReturnRefundManager;
