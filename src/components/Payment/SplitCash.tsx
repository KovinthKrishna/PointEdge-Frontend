import React from "react";
import { VStack, Text, Image } from "@chakra-ui/react";
import ButtonComponent from "./ButtonComponent";

interface SplitCashProps {
  amount?: number;
  onPaymentSuccess?: () => void;
}

const SplitCash: React.FC<SplitCashProps> = ({
  amount = 0,
  onPaymentSuccess,
}) => {
  const handleOkayClick = () => {
    if (onPaymentSuccess) onPaymentSuccess();
  };

  return (
    <VStack
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
      position="relative"
      bg="white"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image
        src="/src/assets/1 1.png"
        alt="Bag"
        opacity={1}
        position="absolute"
        right={0}
        bottom={0}
        width="70%"
        height="auto"
        objectFit="contain"
        zIndex={0}
        border="10px solid white"
        borderRadius="lg"
      />
      <VStack
        justifyContent="center"
        alignItems="flex-start"
        height="100%"
        width="100%"
        marginLeft={"100px"}
        position="relative"
        zIndex={1}
        spacing={4}
      >
        <Text fontSize="3xl" fontWeight="bold" color="#003049" mb={2}>
          Rs: {amount.toLocaleString("en-LK", { minimumFractionDigits: 2 })}
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="#003049" mb={2}>
          Cash Payment Received.
        </Text>
        <ButtonComponent text="OK" onClick={handleOkayClick} />
      </VStack>
    </VStack>
  );
};

export default SplitCash;
