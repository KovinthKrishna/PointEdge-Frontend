// Receipt.tsx
import { Box, Text, VStack } from "@chakra-ui/react";

const Receipt = () => (
  <Box id="printableArea" p={4} bg="white">
    <VStack spacing={2} align="start">
      <Text fontSize="xl" fontWeight="bold">
        Point Edge
      </Text>
      <Text>Date: {new Date().toLocaleDateString()}</Text>
      <Text>-----------------------------</Text>
      <Text>Item 1 - Rs. 1000.00</Text>
      <Text>Item 2 - Rs. 2000.00</Text>
      <Text>-----------------------------</Text>
      <Text>Total: Rs. 3000.00</Text>
      <Text>Thank you for your purchase!</Text>
    </VStack>
  </Box>
);

export default Receipt;
