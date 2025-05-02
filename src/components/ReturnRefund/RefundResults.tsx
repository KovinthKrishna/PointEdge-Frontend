import { Box, Button, Heading, Text, Flex, VStack } from "@chakra-ui/react";
import { FaPrint } from "react-icons/fa";
import { Icon, CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import React, { useEffect } from "react";
import priceFormatter from "../../utils/priceFormatter";

// Helper function to format the currency in Sri Lankan Rupees
/*const formatToRupees = (amount: number) => {
  return `Rs. ${amount.toLocaleString("si-LK")}`;
};*/

interface RefundResultProps {
  success: boolean;
  amount: number;
  method: string;
  invoiceNumber: string;
  onClose: () => void;
  onPrint?: () => void;
}

const RefundResult: React.FC<RefundResultProps> = ({
  success,
  amount,
  method,
  invoiceNumber,
  onClose,
  onPrint,
}) => {
  return (
    <Box p={4}>
      <VStack gap={4} align="center" mb={6}>
        {success ? (
          <Icon as={CheckCircleIcon} w={16} h={16} color="green.500" />
        ) : (
          <Icon as={WarningIcon} w={16} h={16} color="red.500" />
        )}

        <Heading size="md">
          {success ? "Refund Successful" : "Refund Failed"}
        </Heading>

        {success ? (
          <Text textAlign="center">
            A refund of {priceFormatter(amount)} has been processed via {method}{" "}
            for invoice #{invoiceNumber}.
          </Text>
        ) : (
          <Text textAlign="center">
            The refund of {priceFormatter(amount)} via {method} for invoice #
            {invoiceNumber} could not be processed. Please try again or contact
            support.
          </Text>
        )}
      </VStack>

      <Flex justifyContent="center" gap={3}>
        {success && (
          <Button
            {...({ leftIcon: <Icon as={FaPrint} /> } as any)}
            onClick={onPrint}
          >
            Print Receipt
          </Button>
        )}
        <Button colorScheme={success ? "green" : "red"} onClick={onClose}>
          {success ? "Done" : "Try Again"}
        </Button>
      </Flex>
    </Box>
  );

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [success, onClose]);
};

export default RefundResult;
