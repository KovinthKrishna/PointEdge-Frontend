import React from "react";
import {
  Box,
  Button,
  VStack,
  Text,
  Icon,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { useRefundStore } from "../../store/useRefundRequestStore";

interface RefundResultProps {
  success: boolean;
  invoiceNumber: string;
  onClose: () => void;
  onPrint: () => void;
  onBack?: () => void;
}

const RefundResult: React.FC<RefundResultProps> = ({
  success,
  invoiceNumber,
  onClose,
  onPrint,
  onBack,
}) => {
  const { refundAmount, refundMethod } = useRefundStore();

  const displayAmount = refundMethod === "Exchange" ? 0 : refundAmount;
  const amountLabel =
    refundMethod === "Exchange" ? "Amount Adjusted" : "Amount Refunded";

  return (
    <Box
      bg="white"
      p={8}
      borderRadius="2xl"
      boxShadow="md"
      width="100%"
      maxW="500px"
      mx="auto"
      textAlign="center"
    >
      <VStack spacing={4}>
        <Icon
          as={success ? CheckCircleIcon : WarningIcon}
          w={10}
          h={10}
          color={success ? "green" : "red"}
        />
        <Text fontSize="xl" fontWeight="bold" color="darkBlue">
          Refund {success ? "Successful" : "Failed"}
        </Text>
        <Text fontSize="md" color="gray">
          Invoice #: <strong>{invoiceNumber}</strong>
        </Text>

        <Divider my={2} />

        <Text fontSize="lg" fontWeight="medium">
          {amountLabel}:{" "}
          <Text
            as="span"
            color={refundMethod === "Exchange" ? "blue.500" : "green.500"}
            fontWeight="bold"
          >
            Rs {refundAmount.toFixed(2)}
          </Text>
        </Text>

        <Text fontSize="md" color="darkBlue">
          Refund Method: <strong>{refundMethod}</strong>
        </Text>

        <HStack spacing={4} pt={4}>
          {!success && onBack && (
            <Button variant="ghost" onClick={onBack}>
              ⬅ Back
            </Button>
          )}
          <Button
            colorScheme="blue"
            bg="darkBlue"
            _hover={{ bg: "blue" }}
            onClick={onPrint}
          >
            Print Receipt
          </Button>
          <Button
            variant="outline"
            colorScheme="blue"
            onClick={onClose}
            _hover={{
              bg: "red",
              color: "white",
              borderColor: "red",
            }}
          >
            Close
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default RefundResult;
