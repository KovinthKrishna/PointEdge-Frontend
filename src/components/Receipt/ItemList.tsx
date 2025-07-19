import { Box, HStack, Icon, Text, VStack, Flex } from "@chakra-ui/react";
import { FiShoppingBag } from "react-icons/fi";
import useCartStore from "../../store/useCartStore";
import axios from "axios";
import { useCustomerStore } from "../../store/useCustomerStore";
import { useEffect } from "react";

const ItemList = () => {
  const orderItems = useCartStore((state) => state.orderItems);
  const customerDiscountCode = useCustomerStore((state) => state.discountCode);

  useEffect(() => {
    const sendOrderDetails = async () => {
      try {
        if (orderItems.length === 0) return;

        // Prepare items map
        const itemsMap = orderItems.reduce((acc, item) => {
          acc[item.product.id] = item.quantity;
          return acc;
        }, {} as Record<number, number>);

        await axios.post(
          "http://localhost:8080/api/v1/discount/save-order-details",
          {
            phone: customerDiscountCode,
            items: itemsMap,
          }
        );
      } catch (error) {
        console.error("Failed to save order details", error);
      }
    };

    sendOrderDetails();
  }, [orderItems, customerDiscountCode]);

  return (
    <Box
      mb={6}
      bg="#FFFFFF"
      borderRadius="xl"
      p={5}
      boxShadow="0 2px 10px rgba(0,0,0,0.05)"
    >
      <HStack
        spacing={3}
        mb={4}
        pb={3}
        borderBottom="2px"
        borderColor="#DBEAFE"
      >
        <Icon as={FiShoppingBag} color="#3B82F6" boxSize={5} />
        <Text
          fontSize="sm"
          fontWeight="bold"
          color="#1E3A8A"
          letterSpacing="wide"
        >
          ITEMS PURCHASED
        </Text>
      </HStack>
      <VStack spacing={3} align="stretch">
        {orderItems.map((item, idx) => (
          <Box
            key={idx}
            p={4}
            _hover={{
              bg: "#EFF6FF",
              transform: "translateX(4px)",
              borderColor: "#93C5FD",
            }}
            borderRadius="lg"
            transition="all 0.2s"
            border="1px"
            borderColor="#E5E7EB"
            position="relative"
          >
            <Flex justify="space-between" align="center">
              <Box flex="1">
                <Text fontSize="sm" fontWeight="bold" color="#1F2937">
                  {item.product.name} &times; {item.quantity}
                </Text>
              </Box>
              <Text fontSize="sm" fontWeight="bold" color="#2563EB">
                LKR {(item.pricePerUnit * item.quantity).toFixed(2)}
              </Text>
            </Flex>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default ItemList;
