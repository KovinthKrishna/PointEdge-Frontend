import { useState } from "react";
import { Box, Button, HStack, Icon, Text } from "@chakra-ui/react";
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
import React from "react";
import { WarningIcon } from "@chakra-ui/icons";

// Prop types for the component
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
                <Text fontSize="sm">Please enter an invoice number</Text>
              </Box>
            </HStack>
          </Box>
        ),
      });

      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(invoiceNumber);
    } catch (error) {
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
              borderColor: "red",
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
