import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Switch,
  Text,
  useRadio,
  useRadioGroup,
  UseRadioProps,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePaymentFlow } from "../../hooks/usePaymentFlow";
import { OrderDetails } from "../../models/OrderDetails";
import ModelBoxPopup from "../Common/ModelBoxPopup";
import CardPaymentModal from "./CardPaymentModal";
import CashPaymentModal from "./CashPaymentModal";
import SplitPaymentModal from "./SplitPaymentModal";

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
  orderDetails: OrderDetails;
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
  orderDetails,
}) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "paymentMethod",
    defaultValue: selectedMethod,
    onChange: (value) => setSelectedMethod(value as string),
  });

  getRootProps();

  const [cashInput, setCashInput] = useState(cashAmount.toString());
  const [cardInput, setCardInput] = useState(cardAmount.toString());

  const [showCashModal, setShowCashModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showSplitModal, setShowSplitModal] = useState(false);

  const { setIsReceiptOpen } = usePaymentFlow();

  useEffect(() => {
    if (!splitEnabled) {
      if (selectedMethod === "cash") {
        setCashAmount(totalAmount);
        setCardAmount(0);
        setCashInput(totalAmount.toFixed(2));
        setCardInput("0.00");
      } else if (selectedMethod === "card") {
        setCardAmount(totalAmount);
        setCashAmount(0);
        setCardInput(totalAmount.toFixed(2));
        setCashInput("0.00");
      }
    }
  }, [selectedMethod, splitEnabled, totalAmount]);

  // --- Split logic: auto-adjust fields ---
  useEffect(() => {
    if (splitEnabled) {
      // When cash changes, update card
      const cashNum = parseFloat(cashInput);
      if (!isNaN(cashNum) && document.activeElement?.id === "cash-input") {
        const cardVal = Math.max(totalAmount - cashNum, 0);
        setCardAmount(cardVal);
        setCardInput(cardVal.toFixed(2));
      }
      // When card changes, update cash
      const cardNum = parseFloat(cardInput);
      if (!isNaN(cardNum) && document.activeElement?.id === "card-input") {
        const cashVal = Math.max(totalAmount - cardNum, 0);
        setCashAmount(cashVal);
        setCashInput(cashVal.toFixed(2));
      }
    }
    // eslint-disable-next-line
  }, [cashInput, cardInput, splitEnabled, totalAmount]);

  const handleCashChange = (val: string) => {
    setCashInput(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setCashAmount(num);
    }
  };

  const handleCardChange = (val: string) => {
    setCardInput(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setCardAmount(num);
    }
  };

  // Auto-calculate remaining amount on Enter key press
  // for cash and card inputs

  const handleCashKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && splitEnabled) {
      const entered = parseFloat(cashInput);
      if (!isNaN(entered)) {
        const remaining = Math.max(totalAmount - entered, 0);
        setCashAmount(entered);
        setCardAmount(remaining);
        setCardInput(remaining.toFixed(2));
      }
    }
  };

  const handleCardKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && splitEnabled) {
      const entered = parseFloat(cardInput);
      if (!isNaN(entered)) {
        const remaining = Math.max(totalAmount - entered, 0);
        setCardAmount(entered);
        setCashAmount(remaining);
        setCashInput(remaining.toFixed(2));
      }
    }
  };

  const formatOnBlur = (type: "cash" | "card") => {
    if (type === "cash") {
      setCashInput(cashAmount.toFixed(2));
    } else {
      setCardInput(cardAmount.toFixed(2));
    }
  };

  const handleConfirmPayment = () => {
    setShowCashModal(false);
    setShowCardModal(false);
    setShowSplitModal(false);

    if (splitEnabled) {
      setShowSplitModal(true);
    } else if (selectedMethod === "cash") {
      setShowCashModal(true);
    } else if (selectedMethod === "card") {
      setShowCardModal(true);
    }
  };

  const navigate = useNavigate();
  const handleAddCustomer = () => {
    setShowCashModal(false);
    setShowCardModal(false);
    setShowSplitModal(false);
    navigate("/admin/discounts/customers");
  };

  return (
    <VStack align="start" spacing={5} width="100%">
      <Flex justifyContent="space-between" width="100%" alignItems="center">
        <Text fontSize="28px" fontWeight="bold" color="#002a45">
          Payment
        </Text>
      </Flex>

      <Divider borderColor="#007db2ff" />

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
        <Flex width="100%" justifyContent="space-between" alignItems="center">
          <CustomRadioButton {...getRadioProps({ value: "cash" })}>
            Cash
          </CustomRadioButton>

          <Input
            id="cash-input"
            width="150px"
            placeholder="0.00"
            type="number"
            value={cashInput}
            onChange={(e) => handleCashChange(e.target.value)}
            onBlur={() => formatOnBlur("cash")}
            onKeyDown={handleCashKeyDown}
            isDisabled={selectedMethod !== "cash" && !splitEnabled}
            textAlign="right"
            borderColor="#ccc"
            _focus={{
              borderColor: "#0085ca",
              boxShadow: "0 0 0 1px #0085ca",
            }}
          />
        </Flex>

        <Flex width="100%" justifyContent="space-between" alignItems="center">
          <CustomRadioButton {...getRadioProps({ value: "card" })}>
            Card
          </CustomRadioButton>

          <Input
            id="card-input"
            width="150px"
            placeholder="0.00"
            type="number"
            value={cardInput}
            onChange={(e) => handleCardChange(e.target.value)}
            onBlur={() => formatOnBlur("card")}
            onKeyDown={handleCardKeyDown}
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
        onClick={handleConfirmPayment}
      >
        Confirm Payment
      </Button>

      {/* Cash Payment Modal */}
      <ModelBoxPopup
        isOpen={showCashModal}
        onClose={() => setShowCashModal(false)}
      >
        <CashPaymentModal amount={totalAmount} />
      </ModelBoxPopup>

      {/* Card Payment Modal */}
      <ModelBoxPopup
        isOpen={showCardModal}
        onClose={() => setShowCardModal(false)}
      >
        {orderDetails ? (
          <CardPaymentModal
            onClose={() => setShowCardModal(false)}
            amount={orderDetails.total}
            currency={orderDetails.currency.toLowerCase()}
            showSuccess={(title, desc) => console.log("Success:", title, desc)}
            showError={(title, desc) => console.log("Error:", title, desc)}
            setIsReceiptOpen={() => console.log("Receipt opened")}
          />
        ) : (
          <Text p={4}>Loading order details...</Text>
        )}
      </ModelBoxPopup>

      {/* Split Payment Modal */}
      <SplitPaymentModal
        isOpen={showSplitModal}
        onClose={() => setShowSplitModal(false)}
        amount={totalAmount}
        currency={orderDetails.currency.toLowerCase()}
        cardAmount={cardAmount}
        cashAmount={cashAmount}
        onComplete={() => setIsReceiptOpen(true)} // Assuming you have this from usePaymentFlow()
      />

      <Flex justifyContent="center" width="100%">
        <Text
          color="#0085ca"
          fontSize="16px"
          cursor="pointer"
          onClick={handleAddCustomer}
        >
          + Add Customer
        </Text>
      </Flex>
    </VStack>
  );
};

export default PaymentMethodSelector;
