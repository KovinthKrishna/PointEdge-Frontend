// ResetPWFooter.tsx
import { VStack, HStack, Box, Text, Divider } from "@chakra-ui/react";

const ResetPWFooter = () => (
  <VStack spacing={3} p={4}>
    <Divider my={4} />
    <HStack spacing={2}>
      <Box w={2} h={2} bg="green.400" borderRadius="full" />
      <Text fontSize="sm" fontWeight="500">
        You were redirected here from email
      </Text>
    </HStack>
    <HStack spacing={2} opacity={0.8}>
      <Text fontSize="sm" fontWeight="600">
        Powered by
      </Text>
      <Text fontSize="sm" fontWeight="700" color="#003049">
        @PointEdge
      </Text>
    </HStack>
  </VStack>
);

export default ResetPWFooter;
