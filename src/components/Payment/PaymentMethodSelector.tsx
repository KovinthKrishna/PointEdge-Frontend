import React from "react";
import {
  VStack,
  Text,
  Button,
  Divider,
  Switch,
  Input,
  Box,
  Flex,
  useRadioGroup,
} from "@chakra-ui/react";
import { useRadio, UseRadioProps } from "@chakra-ui/react";

// Custom Radio Button Component
function CustomRadioButton(
  props: UseRadioProps & { children: React.ReactNode }
) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label" cursor="pointer">
      <input {...input} />
      <Flex alignItems="center">
        <Box
          {...checkbox}
          width="12.5px"
          height="12.5px"
          borderRadius="full"
          borderWidth="2px"
          borderColor="#0085ca"
          mr={5}
          position="relative"
          _checked={{
            "&::after": {
              content: '""',
              width: "12px",
              height: "12px",
              bg: "#0085ca",
              borderRadius: "full",
              position: "absolute",
              top: "4px",
              left: "4px",
              transform: "translate(-50%, -50%)",
            },
          }}
        />
        <Text fontSize="16px">{props.children}</Text>
      </Flex>
    </Box>
  );
}

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  setSelectedMethod: (method: string) => void;
  totalAmount: number;
  splitEnabled: boolean;
  setSplitEnabled: (enabled: boolean) => void;
  cashAmount: number;
  setCashAmount: (amount: number) => void;
  cardAmount: number;
  setCardAmount: (amount: number) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  setSelectedMethod,
  totalAmount,
  splitEnabled,
  setSplitEnabled,
  cashAmount,
  setCashAmount,
  cardAmount,
  setCardAmount,
}) => {
  // Radio group hook
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "paymentMethod",
    defaultValue: selectedMethod,
    onChange: (value) => setSelectedMethod(value as string),
  });

  const group = getRootProps();

  return (
    <VStack align="start" spacing={5} width="100%">
      <Flex justifyContent="space-between" width="100%" alignItems="center">
        <Text fontSize="28px" fontWeight="bold" color="#002a45">
          Payment
        </Text>
      </Flex>

      <Divider borderColor="#e0e0e0" />

      <Flex width="100%" justifyContent="space-between" alignItems="center">
        <Text fontSize="18px" fontWeight="500" color="#0085ca">
          Choose Payment Method
        </Text>

        <Flex alignItems="center">
          <Text mr={2} fontSize="16px" color="#002a45">
            To Split
          </Text>
          <Switch
            size="md"
            colorScheme="blue"
            isChecked={splitEnabled}
            onChange={() => setSplitEnabled(!splitEnabled)}
            sx={{
              "& .chakra-switch__track": {
                backgroundColor: splitEnabled ? "#0085ca" : "#e2e8f0",
              },
              "& .chakra-switch__thumb": {
                backgroundColor: "white",
              },
            }}
          />
        </Flex>
      </Flex>

      <VStack align="start" spacing={6} width="100%">
        {/* Cash Option with custom radio */}
        <Flex width="100%" justifyContent="space-between" alignItems="center">
          <CustomRadioButton {...getRadioProps({ value: "cash" })}>
            Cash
          </CustomRadioButton>

          <Input
            width="150px"
            placeholder="0.00"
            type="number"
            value={cashAmount || ""}
            onChange={(e) => setCashAmount(Number(e.target.value))}
            isDisabled={selectedMethod !== "cash" && !splitEnabled}
            textAlign="right"
            borderColor="#ccc"
            _focus={{
              borderColor: "#0085ca",
              boxShadow: "0 0 0 1px #0085ca",
            }}
          />
        </Flex>

        {/* Card Option with custom radio */}
        <Flex width="100%" justifyContent="space-between" alignItems="center">
          <CustomRadioButton {...getRadioProps({ value: "card" })}>
            Card
          </CustomRadioButton>

          <Input
            width="150px"
            placeholder="0.00"
            type="number"
            value={cardAmount || ""}
            onChange={(e) => setCardAmount(Number(e.target.value))}
            isDisabled={selectedMethod !== "card" && !splitEnabled}
            textAlign="right"
            borderColor="#ccc"
            _focus={{
              borderColor: "#0085ca",
              boxShadow: "0 0 0 1px #0085ca",
            }}
          />
        </Flex>
      </VStack>

      <Button
        mt={16}
        bg="#002a45"
        color="white"
        width="100%"
        height="50px"
        fontSize="18px"
        borderRadius="md"
        _hover={{ bg: "#003b62" }}
      >
        Confirm Payment
      </Button>

      {/* Add Customer Link */}
      <Flex justifyContent="center" width="100%">
        <Text color="#0085ca" fontSize="16px" cursor="pointer">
          + Add Customer
        </Text>
      </Flex>
    </VStack>
  );
};

export default PaymentMethodSelector;
