import { Box, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { FiUser, FiStar } from "react-icons/fi";
import { useCustomerStore } from "../../store/useCustomerStore";

const CustomerInfo: React.FC = () => {
  const { customerInfo } = useCustomerStore();

  if (!customerInfo) return null; // Hide if no customer info available

  return (
    <Box
      mb={6}
      p={5}
      bg="#FFFFFF"
      borderRadius="xl"
      boxShadow="0 4px 20px rgba(59, 130, 246, 0.1)"
      border="2px"
      borderColor="#93C5FD"
      position="relative"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="3px"
        bgGradient="linear(to-r, #60A5FA, #A855F7)"
      />
      <Flex align="center" justify="space-between">
        <HStack spacing={3}>
          <Box
            p={2}
            bg="#EFF6FF"
            borderRadius="lg"
            border="1px"
            borderColor="#93C5FD"
          >
            <Icon as={FiUser} color="#3B82F6" boxSize={5} />
          </Box>
          <Box>
            <Text fontSize="xs" color="#6B7280" fontWeight="semibold">
              CUSTOMER
            </Text>
            <Text fontSize="sm" fontWeight="bold" color="#1F2937">
              {customerInfo.name}
            </Text>
          </Box>
        </HStack>
        <HStack spacing={3}>
          <Box
            p={2}
            bg="#FEFCE8"
            borderRadius="lg"
            border="1px"
            borderColor="#FDE047"
          >
            <Icon as={FiStar} color="#EAB308" boxSize={5} />
          </Box>
          <Box textAlign="right">
            <Text fontSize="xs" color="#6B7280" fontWeight="semibold">
              LOYALTY POINTS
            </Text>
            <Text fontSize="sm" fontWeight="bold" color="#CA8A04">
              {customerInfo.loyaltyPoints.toLocaleString()}
            </Text>
          </Box>
        </HStack>
      </Flex>
    </Box>
  );
};

export default CustomerInfo;
