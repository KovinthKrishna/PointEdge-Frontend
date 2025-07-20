import { Box, HStack, Text, useToast, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { CreditCard, Repeat, Wallet } from "lucide-react";
import React, { useState } from "react";
import ActionButtons from "./ActionButtons";

interface RefundMethodSelectionProps {
  totalAmount: number;
  onSubmit: (method: string) => void;
  onCancel: () => void;
  onExchangeSelect?: () => void;
  onCardPayment?: () => void;
}

const MotionBox = motion(Box);

const RefundMethodSelection: React.FC<RefundMethodSelectionProps> = ({
  totalAmount,
  onSubmit,
  onCancel,
  // onExchangeSelect,
  // onCardPayment,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const toast = useToast();

  const methods = [
    { label: "Cash", icon: Wallet },
    { label: "Card", icon: CreditCard },
    { label: "Exchange", icon: Repeat },
  ];

  const handleCardSelect = (method: string) => {
    setSelectedMethod(method);
    toast({
      position: "top",
      duration: 2000,
      isClosable: true,
      render: () => (
        <Box
          bg="darkBlue"
          color="white"
          p={3}
          borderRadius="md"
          boxShadow="md"
          fontWeight="medium"
        >
          Refund method selected: {method}
        </Box>
      ),
    });
  };

  const handleConfirm = () => {
    if (!selectedMethod) return;

    switch (selectedMethod) {
      case "Exchange":
        onSubmit(selectedMethod);
        break;
      case "Card":
        onSubmit(selectedMethod);
        break;
      case "Cash":
      default:
        onSubmit(selectedMethod);
        break;
    }
  };

  return (
    <VStack spacing={6}>
      <Text fontSize="xl" fontWeight="bold" color="darkBlue">
        Total Refund Amount: Rs {totalAmount.toFixed(2)}
      </Text>

      <Text fontSize="md" color="gray.600">
        Select a refund method
      </Text>

      <HStack spacing={6}>
        {methods.map(({ label, icon: Icon }) => (
          <MotionBox
            key={label}
            onClick={() => handleCardSelect(label)}
            cursor="pointer"
            borderWidth={2}
            borderColor={selectedMethod === label ? "darkBlue" : "gray.200"}
            borderRadius="xl"
            p={6}
            textAlign="center"
            bg={selectedMethod === label ? "skyBlue" : "white"}
            boxShadow={selectedMethod === label ? "md" : "sm"}
            _hover={{ boxShadow: "lg" }}
            minW="140px"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <VStack spacing={3}>
              <Icon
                size={32}
                color={selectedMethod === label ? "#003049" : "#00669B"}
              />
              <Text fontSize="lg" fontWeight="semibold">
                {label}
              </Text>
            </VStack>
          </MotionBox>
        ))}
      </HStack>

      <HStack spacing={4} pt={4}>
        <ActionButtons
          onSubmit={handleConfirm}
          onCancel={onCancel}
          disabled={!selectedMethod}
          text1="Cancel"
          text2="Confirm"
        />
      </HStack>
    </VStack>
  );
};

export default RefundMethodSelection;
