import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Button,
  VStack,
  Text,
  Box,
  Flex,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import PopupAlert from "../Common/PopupAlert";
import { usePaymentFlow } from "../../hooks/usePaymentFlow";
import ReceiptPopup from "../Receipt/ReceiptPopup";

const stripePromise = loadStripe(
  "pk_test_51Rl11VFgHQWIbBdJRhmeHnS4XpIue3NuAyK5rG1iOThpJLM4Pw6zCNJXoGdMwN1lsnrUo4MDOBIApHxR5928bnW000RubcnR0X"
);

interface CardPaymentModalProps {
  onClose: () => void;
  onPaymentSuccess?: () => void;
  amount: number;
  currency: string;
  showSuccess: (title: string, desc: string) => void;
  showError: (title: string, desc: string) => void;
  setIsReceiptOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckoutForm: React.FC<CardPaymentModalProps> = ({
  amount,
  currency,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const {
    isAlertOpen,
    alertTitle,
    alertDescription,
    isReceiptOpen,
    showSuccess,
    showError,
    handleAlertClose,
    setIsReceiptOpen,
  } = usePaymentFlow();

  const [loading, setLoading] = useState(false);
  const [nfcEnabled, setNfcEnabled] = useState(false);
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);

  const onAlertClose = () => {
    handleAlertClose();
    if (paymentSucceeded) {
      setIsReceiptOpen(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPaymentSucceeded(false);

    try {
      const amountInCents = Math.round(amount * 100);
      const res = await fetch("http://localhost:8080/api/payment/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountInCents,
          currency: currency,
          customerEmail: "test@example.com",
        }),
      });

      const paymentData = await res.json();

      if (!paymentData.success || !paymentData.clientSecret) {
        throw new Error(paymentData.message || "Something went wrong");
      }

      if (nfcEnabled) {
        await saveOrderDetailsToBackend();
        showSuccess(
          "Payment Successful via NFC",
          "NFC payment processed successfully."
        );
        setPaymentSucceeded(true);
        setLoading(false);
        return;
      }

      if (!stripe || !elements) throw new Error("Stripe is not initialized");

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("Card element not found");

      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(paymentData.clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: { email: "test@example.com" },
          },
        });

      if (confirmError) {
        throw new Error(confirmError.message || "Payment confirmation failed");
      }

      if (paymentIntent?.status === "succeeded") {
        await saveOrderDetailsToBackend();
        showSuccess("Payment Successful", "Your payment was successful.");
        setPaymentSucceeded(true);
      } else {
        throw new Error(paymentIntent?.status || "Unknown payment status");
      }
    } catch (error: any) {
      showError("Payment Failed", error.message || "Unexpected error occurred");
      setPaymentSucceeded(false);
    } finally {
      setLoading(false);
    }
  };

  const saveOrderDetailsToBackend = async () => {
    const payload = {
      phone: "0753654857",
      items: {
        "1": 2,
        "2": 1,
        "3": 3,
      },
    };

    const response = await fetch(
      "http://localhost:8080/api/v1/discount/save-order-details",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to save order details for discount.");
    }

    return await response.json();
  };

  return (
    <Flex justify="center" align="center" bg="gray.100">
      <Box
        width="100%"
        maxWidth="800px"
        bg="white"
        mt={10}
        borderRadius="lg"
        p={6}
      >
        <Text
          fontSize="35px"
          fontWeight="bold"
          color="#003a56ff"
          mb={4}
          textAlign="center"
        >
          Card Payment
        </Text>

        <Box bg="#fff" p={4} borderRadius="md" mb={6} textAlign="center">
          <Text color="#087eb9ff" fontSize="sm" fontWeight="bold" mb={1}>
            Total Amount
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="#003a56ff">
            {amount.toFixed(2)} {currency.toUpperCase()}
          </Text>
        </Box>

        {/* Toggle */}
        <FormControl display="flex" alignItems="center" mb={4}>
          <Switch
            id="nfcToggle"
            isChecked={nfcEnabled}
            onChange={() => setNfcEnabled(!nfcEnabled)}
            mr={3}
            sx={{
              ".chakra-switch__track": {
                bg: nfcEnabled ? "#003a56ff" : "#E2E8F0",
              },
              ".chakra-switch__thumb": {
                bg: "#ffffff",
              },
            }}
          />
          <FormLabel
            htmlFor="nfcToggle"
            mb="0"
            fontWeight="medium"
            color="#003a56ff"
          >
            Scan Card via NFC
          </FormLabel>
        </FormControl>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            {!nfcEnabled ? (
              <Box>
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  color="#003a56ff"
                  mb={2}
                >
                  Card Details
                </Text>
                <Box
                  border="2px solid"
                  borderColor="blue.500"
                  borderRadius="md"
                  p={4}
                  minHeight="50px"
                  width="100%"
                  _focusWithin={{
                    borderColor: "blue.600",
                    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                  }}
                >
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#2D3748",
                          "::placeholder": { color: "#A0AEC0" },
                        },
                        invalid: { color: "#E53E3E" },
                      },
                    }}
                  />
                </Box>
              </Box>
            ) : (
              <Box
                border="2px dashed"
                borderColor="green.500"
                borderRadius="md"
                p={6}
                textAlign="center"
                color="green.600"
                fontWeight="bold"
              >
                Please scan your card using NFC Reader
              </Box>
            )}

            <Button
              type="submit"
              bg="#003a56ff"
              color="white"
              size="lg"
              width="100%"
              mt={4}
              _hover={{ bg: "#026589ff" }}
              isLoading={loading}
              loadingText="Processing..."
            >
              Pay Now
            </Button>
          </VStack>
        </form>

        <PopupAlert
          isOpen={isAlertOpen}
          onClose={onAlertClose}
          title={alertTitle}
          description={alertDescription}
          status={
            alertTitle.toLowerCase().includes("success") ? "success" : "error"
          }
        />

        <ReceiptPopup
          isOpen={isReceiptOpen}
          onClose={() => setIsReceiptOpen(false)}
        />
      </Box>
    </Flex>
  );
};

const CardPaymentModal: React.FC<CardPaymentModalProps> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  );
};

export default CardPaymentModal;
