import React, { useState } from "react";
import { Box, Flex, Heading, Text, Stack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";

interface RefundMethodProps {
  totalAmount: number;
  onSubmit: (method: string) => void;
  onCancel: () => void;
}

const RefundMethodSelection: React.FC<RefundMethodProps> = ({
  totalAmount,
  onSubmit,
  onCancel,
}) => {
  const [refundMethod, setRefundMethod] = useState<string>("cash");

  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Select Refund Method
      </Heading>
      <Text mb={4} fontWeight="bold">
        Total Amount to Refund: ${totalAmount.toFixed(2)}
      </Text>

      <RadioGroup onChange={setRefundMethod} value={refundMethod} mb={6}>
        <Stack>
          <Radio value="cash">Cash</Radio>
          <Radio value="card">Credit/Debit Card</Radio>
          <Radio value="store_credit">Store Credit</Radio>
        </Stack>
      </RadioGroup>

      <Flex justifyContent="flex-end" gap={3}>
        <Button onClick={onCancel} variant="outline">
          Back
        </Button>
        <Button colorScheme="blue" onClick={() => onSubmit(refundMethod)}>
          Process Refund
        </Button>
      </Flex>
    </Box>
  );
};

export default RefundMethodSelection;
