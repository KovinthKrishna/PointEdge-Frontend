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
      // Error handling logic remains unchanged
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleSubmit();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
      size="md"
    >
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
      <ModalContent borderRadius="xl" boxShadow="2xl" bg="white" mx={4} my={8}>
        <ModalHeader
          fontSize="xl"
          fontWeight="semibold"
          color="gray.800"
          pb={2}
          borderBottom="1px"
          borderColor="gray.100"
        >
          Enter Invoice Number
        </ModalHeader>

        <ModalCloseButton
          size="lg"
          color="gray.400"
          _hover={{ color: "gray.600", bg: "gray.50" }}
          borderRadius="full"
        />

        <ModalBody py={6}>
          <FormControl>
            <FormLabel
              fontSize="sm"
              fontWeight="medium"
              color="gray.700"
              mb={3}
            >
              Invoice Number
            </FormLabel>
            <Input
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter invoice number"
              size="lg"
              borderRadius="lg"
              border="2px"
              borderColor="gray.200"
              bg="gray.50"
              _hover={{
                borderColor: "gray.300",
                bg: "white",
              }}
              _focus={{
                borderColor: "darkBlue",
                bg: "white",
                boxShadow: "0 0 0 1px darkBlue",
              }}
              _placeholder={{
                color: "gray.400",
              }}
              fontSize="md"
              autoFocus
            />
          </FormControl>
        </ModalBody>

        <ModalFooter
          pt={4}
          pb={6}
          gap={3}
          borderTop="1px"
          borderColor="gray.100"
        >
          <Button
            variant="outline"
            color="darkBlue"
            border="2px"
            borderColor="darkBlue"
            height="44px"
            minWidth={120}
            borderRadius="lg"
            fontSize="md"
            fontWeight="semibold"
            _hover={{
              bg: "darkBlue",
              color: "white",
              borderColor: "darkBlue",
              transform: "translateY(-1px)",
              boxShadow: "md",
            }}
            _active={{
              transform: "translateY(0px)",
            }}
            _loading={{
              _hover: {
                transform: "none",
              },
            }}
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={isLoading}
            loadingText="Processing..."
            spinnerPlacement="start"
          >
            Submit
          </Button>

          <Button
            variant="outline"
            colorScheme="red"
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
