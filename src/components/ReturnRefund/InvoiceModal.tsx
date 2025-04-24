import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

// Define the prop types for the component
interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (invoiceNumber: string) => Promise<void>;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    if (!invoiceNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter an invoice number",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(invoiceNumber);
      // If successful, onSubmit will handle the next steps
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid invoice number or invoice not found",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enter Invoice Number</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Invoice Number</FormLabel>
            <Input
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              placeholder="Enter invoice number"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            color="darkBlue"
            border="2px"
            height={"40px"}
            minWidth={100}
            _hover={{
              bg: "darkBlue",
              color: "white",
              borderColor: "darkBlue",
            }}
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            Submit
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            _hover={{
              bg: "red",
              color: "white",
              borderColor: "darkBlue",
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InvoiceModal;
