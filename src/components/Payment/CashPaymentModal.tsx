import React from "react";
import { VStack, Text, Image } from "@chakra-ui/react";
import ButtonComponent from "./ButtonComponent";
import PopupAlert from "../Common/PopupAlert";
import { usePaymentFlow } from "../../hooks/usePaymentFlow";
import ReceiptPopup from "../Receipt/ReceiptPopup";

interface CashPaymentModalProps {
  amount?: number;
  onPaymentSuccess?: () => void;
}

const CashPaymentModal: React.FC<CashPaymentModalProps> = ({
  amount = 0,
  onPaymentSuccess,
}) => {
  const {
    isAlertOpen,
    alertTitle,
    alertDescription,
    isReceiptOpen,
    showSuccess,
    handleAlertClose,
    setIsReceiptOpen,
  } = usePaymentFlow();

  const handleOkClick = () => {
    showSuccess("Payment Successful", "Cash payment received successfully.");
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
        <ButtonComponent text="OK" onClick={handleOkClick} />
      </VStack>

      <PopupAlert
        isOpen={isAlertOpen}
        onClose={handleAlertClose}
        title={alertTitle}
        description={alertDescription}
        status="success"
      />

      <ReceiptPopup
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
      />
    </VStack>
  );
};

export default CashPaymentModal;
