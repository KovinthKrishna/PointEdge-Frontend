import React from "react";
import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import ModelBoxPopup from "./Common/ModelBoxPopup";

interface ReceiptPopupProps {
  isOpen: boolean;
  onClose: () => void;
  items: { name: string; price: number; quantity?: number }[];
  total: number;
  discount: number;
  finalTotal: number;
}

const ReceiptPopup: React.FC<ReceiptPopupProps> = ({
  isOpen,
  onClose,
  items,
  total,
  discount,
  finalTotal,
}) => {
  const sampleData = {
    customerName: "Customer 1",
    employeeName: "Employee 1",
    loyaltyPoints: 1250,
    receiptNumber: `#${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    storeName: "Point Edge Store",
    storeAddress: "Palk Street, Colombo 07, Sri Lanka",
    storePhone: "(+94) 123-456789",
    currentTime: new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  };

  return (
    <ModelBoxPopup isOpen={isOpen} onClose={onClose}>
      <Box width="100%" maxH="90vh" overflowY="auto">
        {/* Heading */}
        <Box
          bgGradient="linear(to-r, blue.500, purple.600)"
          color="#003a56ff"
          p={6}
          position="relative"
          textAlign={"center"}
        >
          <HStack spacing={3} textAlign={"center"}>
            <Box textAlign={"center"}>
              <Text fontSize="2xl" fontWeight="bold">
                Receipt
              </Text>
              <Text color="blue.100" fontSize="sm">
                {sampleData.receiptNumber}
              </Text>
            </Box>
          </HStack>
        </Box>

        <Box p={6}>
          {/* Store Information */}
          <Box
            textAlign="center"
            mb={6}
            pb={4}
            borderBottom="1px"
            borderColor="gray.200"
          >
            <Text fontSize="lg" fontWeight="semibold" color="gray.800" mb={1}>
              {sampleData.storeName}
            </Text>
            <HStack justify="center" spacing={1} mb={1}>
              <Text color="gray.500">📍</Text>
              <Text fontSize="sm" color="gray.600">
                {sampleData.storeAddress}
              </Text>
            </HStack>
            <HStack justify="center" spacing={1}>
              <Text color="gray.500">📞</Text>
              <Text fontSize="sm" color="gray.600">
                {sampleData.storePhone}
              </Text>
            </HStack>
          </Box>

          {/* Transaction Info */}
          <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={6}>
            <GridItem>
              <Box p={3} bg="gray.50" borderRadius="lg">
                <HStack spacing={2} align="center">
                  <Text color="gray.500">🗓️</Text>
                  <Box>
                    <Text fontSize="xs" color="gray.500">
                      Date & Time
                    </Text>
                    <Text fontSize="sm" fontWeight="medium">
                      {sampleData.currentTime}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </GridItem>
            <GridItem>
              <Box p={3} bg="gray.50" borderRadius="lg">
                <HStack spacing={2} align="center">
                  <Text color="gray.500">👤</Text>
                  <Box>
                    <Text fontSize="xs" color="gray.500">
                      Cashier
                    </Text>
                    <Text fontSize="sm" fontWeight="medium">
                      {sampleData.employeeName}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </GridItem>
          </Grid>

          {/* Customer Info */}
          <Box
            mb={6}
            p={4}
            bgGradient="linear(to-r, blue.50, purple.50)"
            borderRadius="lg"
            border="1px"
            borderColor="blue.100"
          >
            <Flex align="center" justify="space-between">
              <HStack spacing={2}>
                <Text color="blue.600">👤</Text>
                <Box>
                  <Text fontSize="xs" color="gray.500">
                    Customer
                  </Text>
                  <Text fontSize="sm" fontWeight="medium" color="gray.800">
                    {sampleData.customerName}
                  </Text>
                </Box>
              </HStack>
              <HStack spacing={2}>
                <Text color="yellow.500">⭐</Text>
                <Box textAlign="right">
                  <Text fontSize="xs" color="gray.500">
                    Loyalty Points
                  </Text>
                  <Text fontSize="sm" fontWeight="bold" color="yellow.600">
                    {sampleData.loyaltyPoints.toLocaleString()}
                  </Text>
                </Box>
              </HStack>
            </Flex>
          </Box>

          {/* Items */}
          <Box mb={6}>
            <Text
              fontSize="sm"
              fontWeight="semibold"
              color="gray.700"
              mb={3}
              pb={2}
              borderBottom="1px"
              borderColor="gray.200"
            >
              Items Purchased
            </Text>
            <VStack spacing={2} align="stretch">
              {items.map((item, idx) => (
                <Box
                  key={idx}
                  p={3}
                  _hover={{ bg: "gray.50" }}
                  borderRadius="lg"
                  transition="background-color 0.2s"
                >
                  <Flex justify="space-between" align="center">
                    <Box flex="1">
                      <Text fontSize="sm" fontWeight="medium" color="gray.800">
                        {item.name}
                      </Text>
                      {item.quantity && (
                        <Text fontSize="xs" color="gray.500">
                          Qty: {item.quantity}
                        </Text>
                      )}
                    </Box>
                    <Text fontSize="sm" fontWeight="medium" color="gray.800">
                      ${item.price.toFixed(2)}
                    </Text>
                  </Flex>
                </Box>
              ))}
            </VStack>
          </Box>

          {/* Totals */}
          <Box p={4} bg="gray.50" borderRadius="lg" mb={6}>
            <VStack spacing={3} align="stretch">
              <Flex justify="space-between" align="center">
                <Text fontSize="sm" color="gray.600">
                  Subtotal
                </Text>
                <Text fontSize="sm" fontWeight="medium">
                  ${total.toFixed(2)}
                </Text>
              </Flex>

              {discount > 0 && (
                <Flex justify="space-between" align="center">
                  <Text fontSize="sm" color="green.600">
                    Discount
                  </Text>
                  <Text fontSize="sm" fontWeight="medium" color="green.600">
                    -${discount.toFixed(2)}
                  </Text>
                </Flex>
              )}

              <Box pt={2} borderTop="1px" borderColor="gray.200">
                <Flex justify="space-between" align="center">
                  <Text fontSize="lg" fontWeight="bold" color="gray.800">
                    Total
                  </Text>
                  <Text fontSize="lg" fontWeight="bold" color="gray.800">
                    ${finalTotal.toFixed(2)}
                  </Text>
                </Flex>
              </Box>
            </VStack>
          </Box>

          {/* Thank You */}
          <Box
            textAlign="center"
            p={4}
            bgGradient="linear(to-r, green.50, blue.50)"
            borderRadius="lg"
            mb={6}
          >
            <Text fontSize="sm" fontWeight="medium" color="gray.800">
              Thank you for your purchase!
            </Text>
            <Text fontSize="xs" color="gray.600" mt={1}>
              We appreciate your business
            </Text>
          </Box>
        </Box>

        {/* Footer Actions */}
        <Box p={4} bg="gray.50" borderTop="1px" borderColor="gray.200">
          <VStack spacing={3}>
            <Button
              leftIcon={<Text>🖨️</Text>}
              colorScheme="blue"
              width="100%"
              size="lg"
              onClick={() => window.print()}
              _hover={{ transform: "translateY(-1px)", shadow: "md" }}
              transition="all 0.2s"
            >
              Print Receipt
            </Button>
            <Button
              leftIcon={<Text>📧</Text>}
              colorScheme="green"
              width="100%"
              size="lg"
              onClick={onClose}
              _hover={{ transform: "translateY(-1px)", shadow: "md" }}
              transition="all 0.2s"
            >
              Send E-Receipt
            </Button>
          </VStack>
        </Box>
      </Box>
    </ModelBoxPopup>
  );
};

export default ReceiptPopup;
