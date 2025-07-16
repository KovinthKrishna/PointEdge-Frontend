import { Spinner, VStack, Text, Box } from "@chakra-ui/react";
import React from "react";

interface WaitingProps {
  invoiceNumber: string;
}

const WaitingForAdminApproval: React.FC<WaitingProps> = ({ invoiceNumber }) => {
  return (
    <VStack spacing={6} mt={12}>
      <Spinner size="xl" thickness="4px" color="blue.400" />
      <Box textAlign="center">
        <Text fontSize="lg" fontWeight="bold">
          Waiting for admin approval...
        </Text>
        <Text color="gray.500" fontSize="sm">
          Invoice #{invoiceNumber} – Your refund request is under review.
        </Text>
      </Box>
    </VStack>
  );
};

export default WaitingForAdminApproval;
