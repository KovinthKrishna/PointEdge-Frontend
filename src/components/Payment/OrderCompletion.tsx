import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
  Flex,
  Text,
  Button,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface OrderCompletionProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: any;
  onDashboardClick: () => void;
  onNextOrderClick: () => void;
}

const OrderCompletion: React.FC<OrderCompletionProps> = ({
  isOpen,
  onClose,
  orderData,
  onDashboardClick,
  onNextOrderClick,
}) => {
  const navigate = useNavigate();

  const handleNextOrder = () => {
    onClose(); // Close the modal first
    onNextOrderClick();
    navigate("/");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent p={6}>
        <Flex direction="column" align="center" justify="center">
          <VStack spacing={1} w="full" mb={4}>
            <Text color="#0096DB" fontWeight="medium" fontSize="lg">
              Order #{orderData.orderNumber}
            </Text>
            <Heading
              as="h1"
              fontSize="3xl"
              fontWeight="bold"
              color="#003049"
              textAlign="center"
            >
              Completed Successfully!
            </Heading>
          </VStack>

          <Box
            w="full"
            h="240px"
            bg="blue.50"
            borderRadius="xl"
            mb={6}
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <img
              src="/src/assets/orderCompl.png"
              alt="Celebration"
              style={{
                maxHeight: 200,
                maxWidth: "100%",
                objectFit: "contain",
                borderRadius: "1rem",
              }}
            />
          </Box>

          <VStack spacing={6} w="full">
            <Text color="#0096DB" fontWeight="bold" fontSize="lg">
              Well done! You've completed {orderData.completedOrders} orders
              today.
            </Text>

            <Flex gap={4} justify="center">
              <Button
                bg="gray.200"
                color="gray.700"
                size="md"
                px={6}
                onClick={onDashboardClick}
              >
                Dashboard
              </Button>
              <Button
                bg="#0096DB"
                color="white"
                size="md"
                px={6}
                onClick={handleNextOrder}
              >
                Next Order
              </Button>
            </Flex>
          </VStack>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default OrderCompletion;
