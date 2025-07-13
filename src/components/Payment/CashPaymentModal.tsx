import React, { useState } from "react";
import { VStack, Text, Image } from "@chakra-ui/react";
import ButtonComponent from "./ButtonComponent";
import OrderCompletion from "./OrderCompletion";

interface CashPaymentModalProps {
  onClose: () => void;
  amount?: number;
  onOk?: () => void;
}

const CashPaymentModal: React.FC<CashPaymentModalProps> = ({
  onClose,
  amount = 0,
}) => {
  const [showOrderCompletion, setShowOrderCompletion] = useState(false);
  const orderNumber = 12345;
  const dailyOrderCount = 10;

  const handleOk = () => setShowOrderCompletion(true);
  const handleGoHustle = () => {
    setShowOrderCompletion(false);
    onClose();
  };

  if (showOrderCompletion) {
    return (
      <OrderCompletion
        isOpen={true}
        onClose={handleGoHustle}
        orderData={{ orderNumber, completedOrders: dailyOrderCount }}
        onDashboardClick={handleGoHustle}
        onNextOrderClick={handleGoHustle}
      />
    );
  }

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
        alignItems="left"
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
        <ButtonComponent text="OK" onClick={handleOk} />
      </VStack>
    </VStack>
  );
};

export default CashPaymentModal;
