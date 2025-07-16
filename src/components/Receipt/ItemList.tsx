import { Box, HStack, Icon, Text, VStack, Badge, Flex } from "@chakra-ui/react";
import { FiShoppingBag } from "react-icons/fi";

const ItemList = ({
  items,
}: {
  items: { name: string; price: number; quantity?: number }[];
}) => (
  <Box
    mb={6}
    bg="#FFFFFF"
    borderRadius="xl"
    p={5}
    boxShadow="0 2px 10px rgba(0,0,0,0.05)"
  >
    <HStack spacing={3} mb={4} pb={3} borderBottom="2px" borderColor="#DBEAFE">
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
      {items.map((item, idx) => (
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
                {item.name}
              </Text>
              {item.quantity && (
                <Badge colorScheme="blue" variant="subtle" fontSize="xs" mt={1}>
                  Qty: {item.quantity}
                </Badge>
              )}
            </Box>
            <Text fontSize="sm" fontWeight="bold" color="#2563EB">
              ${item.price.toFixed(2)}
            </Text>
          </Flex>
        </Box>
      ))}
    </VStack>
  </Box>
);

export default ItemList;
