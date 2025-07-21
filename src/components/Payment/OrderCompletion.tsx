import React from "react";
import { Box, Flex, Text, Button, Heading, ScaleFade } from "@chakra-ui/react";
import ModelBoxPopup from "../Common/ModelBoxPopup";

interface OrderCompletionProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    orderId: string;
    invoiceNumber: string;
    completedOrdersToday: number;
  };
}

const OrderCompletion: React.FC<OrderCompletionProps> = ({
  isOpen,
  onClose,
  orderData,
}) => {
  return (
    <ModelBoxPopup isOpen={isOpen} onClose={onClose} maxW="600px">
      <Box p={8} borderRadius="2xl">
        <ScaleFade initialScale={0.8} in={isOpen}>
          <Flex direction="column" align="center" justify="center">
            <Text
              color="#10B981"
              fontWeight="semibold"
              fontSize="sm"
              textTransform="uppercase"
              letterSpacing="wide"
              mb={2}
            >
              Order {orderData.orderId}
            </Text>

            <Heading
              as="h1"
              fontSize="3xl"
              fontWeight="bold"
              color="#10B981"
              textAlign="center"
              mb={4}
            >
              Completed Successfully!
            </Heading>

            <Box mb={6}>
              <img
                src="/src/assets/orderCompl.png"
                alt="Celebration"
                style={{
                  maxHeight: 320,
                  borderRadius: "1rem",
                }}
              />
            </Box>

            {orderData &&
              typeof orderData.completedOrdersToday === "number" && (
                <Text
                  color="#2563EB"
                  fontWeight="bold"
                  fontSize="lg"
                  textAlign="center"
                  mb={6}
                >
                  🎉 Well done! You've completed{" "}
                  <Text as="span" color="#10B981" fontSize={"20px"}>
                    {orderData.completedOrdersToday} orders.
                  </Text>{" "}
                  Keep hustling!
                </Text>
              )}
            <Flex gap={4} justify="center">
              <Button
                color="white"
                bg="#2563EB"
                width="100%"
                size="lg"
                onClick={() => {
                  setTimeout(() => window.location.reload(), 50);
                }}
                transition="all 0.3s"
                fontWeight="bold"
                letterSpacing="wide"
                borderRadius="xl"
              >
                Dashboard
              </Button>
            </Flex>
          </Flex>
        </ScaleFade>
      </Box>
    </ModelBoxPopup>
  );
};

export default OrderCompletion;
