import { Box, HStack, Icon, Text, Badge } from "@chakra-ui/react";
import { FiShoppingBag } from "react-icons/fi";

const ReceiptHeader = ({ receiptNumber }: { receiptNumber: string }) => (
  <Box color="#002c78ff" p={6} textAlign="center" borderRadius="lg" mx={6}>
    <HStack spacing={3} justify="center" mb={2}>
      <Icon as={FiShoppingBag} boxSize={8} color="#002c78ff" />
      <Box textAlign="center">
        <Text fontSize="2xl" fontWeight="bold" letterSpacing="wide">
          Receipt
        </Text>
        <Badge
          color="#002c78ff"
          variant="solid"
          fontSize="xs"
          px={3}
          py={1}
          borderRadius="full"
        >
          {receiptNumber}
        </Badge>
      </Box>
    </HStack>
  </Box>
);

export default ReceiptHeader;
