import React, { useState } from "react";
import {
  VStack,
  Text,
  Image,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
} from "@chakra-ui/react";
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
  const [cashGiven, setCashGiven] = useState<string>("");
  const [isTouched, setIsTouched] = useState(false);

  const {
    isAlertOpen,
    alertTitle,
    alertDescription,
    isReceiptOpen,
    showSuccess,
    handleAlertClose,
    setIsReceiptOpen,
  } = usePaymentFlow();

  const parsedCash = parseFloat(cashGiven);
  const isInvalid = isNaN(parsedCash) || parsedCash < amount;
  const balance = isNaN(parsedCash) ? 0 : parsedCash - amount;

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
      spacing={6}
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
        ml="100px"
        position="relative"
        zIndex={1}
        spacing={4}
      >
        <Text fontSize="3xl" fontWeight="bold" color="#003049">
          Amount: Rs.{" "}
          {amount.toLocaleString("en-LK", { minimumFractionDigits: 2 })}
        </Text>

        <FormControl isInvalid={isTouched && isInvalid}>
          <FormLabel fontWeight="semibold" color="#003049">
            Cash Received
          </FormLabel>
          <Input
            placeholder="Enter cash amount"
            value={cashGiven}
            onChange={(e) => {
              setCashGiven(e.target.value);
              if (!isTouched) setIsTouched(true);
            }}
            type="number"
            size="md"
            width="250px"
            focusBorderColor="#003049"
          />
          {isTouched && isInvalid && (
            <FormErrorMessage>
              Amount should be equal or more than total
            </FormErrorMessage>
          )}
        </FormControl>

        {isTouched && !isInvalid && (
          <Box>
            <Text fontSize="xl" fontWeight="medium" color="green.600">
              Balance: Rs. {balance.toFixed(2)}
            </Text>
          </Box>
        )}

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
