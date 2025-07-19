import {
  Box,
  Divider,
  Flex,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiGift } from "react-icons/fi";
import useOrderSummaryStore from "../../store/useOrderSummaryStore";

const TotalSummary = () => {
  const { amount, totalDiscount, total } = useOrderSummaryStore();

  return (
    <Box
      p={5}
      bg="#FFFFFF"
      borderRadius="xl"
      mb={6}
      boxShadow="0 4px 20px rgba(59, 130, 246, 0.1)"
      border="1px"
      borderColor="#DBEAFE"
    >
      <VStack spacing={4} align="stretch">
        <Flex justify="space-between">
          <Text fontSize="sm" color="#4B5563" fontWeight="medium">
            Subtotal
          </Text>
          <Text fontSize="sm" fontWeight="bold" color="#1F2937">
            LKR {amount.toFixed(2)}
          </Text>
        </Flex>

        {totalDiscount > 0 && (
          <Flex justify="space-between">
            <HStack spacing={2}>
              <Icon as={FiGift} color="#10B981" boxSize={4} />
              <Text fontSize="sm" color="#059669" fontWeight="medium">
                Discount
              </Text>
            </HStack>
            <Text fontSize="sm" fontWeight="bold" color="#059669">
              - LKR {totalDiscount.toFixed(2)}
            </Text>
          </Flex>
        )}

        <Divider borderColor="#93C5FD" />

        <Box
          p={3}
          bg="#EFF6FF"
          borderRadius="lg"
          border="1px"
          borderColor="#93C5FD"
        >
          <Flex justify="space-between">
            <Text fontSize="lg" fontWeight="bold" color="#1E3A8A">
              Total
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="#1E3A8A">
              LKR {total.toFixed(2)}
            </Text>
          </Flex>
        </Box>
      </VStack>
    </Box>
  );
};

export default TotalSummary;
