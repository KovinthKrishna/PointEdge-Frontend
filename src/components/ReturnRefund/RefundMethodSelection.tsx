import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  useRadioGroup,
  Button,
} from "@chakra-ui/react";
import RadioCard from "./RadioCard";
import React from "react";

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
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "refundMethod",
    defaultValue: "cash",
    onChange: (value) => setRefundMethod(value),
  });

  const group = getRootProps();
  const [refundMethod, setRefundMethod] = React.useState<string>("cash");

  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Select Refund Method
      </Heading>
      <Text mb={4} fontWeight="bold">
        Total Amount to Refund: Rs {totalAmount.toFixed(2)}
      </Text>

      <Stack {...group} direction="row" mb={6}>
        {["cash", "card", "store_credit"].map((method) => {
          const radio = getRadioProps({ value: method });
          return (
            <RadioCard key={method} {...radio}>
              {method === "cash"
                ? "Cash"
                : method === "card"
                ? "Credit/Debit Card"
                : "Store Credit"}
            </RadioCard>
          );
        })}
      </Stack>

      <Flex justifyContent="flex-end" gap={3}>
        <Button
          variant="outline"
          onClick={onCancel}
          _hover={{
            bg: "darkBlue",
            color: "white",
          }}
        >
          Back
        </Button>
        <Button
          backgroundColor="darkBlue"
          color="white"
          _hover={{ backgroundColor: "blue.800" }}
          onClick={() => onSubmit(refundMethod)}
          isDisabled={!refundMethod}
        >
          Process Refund
        </Button>
      </Flex>
    </Box>
  );
};

export default RefundMethodSelection;
