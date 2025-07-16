import { Box, HStack, Icon, Text } from "@chakra-ui/react";
import { FiCheck } from "react-icons/fi";

const ThankYouNote = () => (
  <Box
    textAlign="center"
    p={5}
    bg="#FFFFFF"
    borderRadius="xl"
    mb={6}
    boxShadow="0 4px 20px rgba(34, 197, 94, 0.1)"
    border="1px"
    borderColor="#BBF7D0"
    position="relative"
  >
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      h="3px"
      bgGradient="linear(to-r, #10B981, #3B82F6)"
    />
    <HStack justify="center" spacing={3} mb={2}>
      <Icon as={FiCheck} color="#10B981" boxSize={6} />
      <Text fontSize="lg" fontWeight="bold" color="#1F2937">
        Thank you for your purchase!
      </Text>
    </HStack>
    <Text fontSize="sm" color="#4B5563" fontWeight="medium">
      We appreciate your business
    </Text>
  </Box>
);

export default ThankYouNote;
