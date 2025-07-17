// ResetPWHeader.tsx
import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { Shield } from "lucide-react";

const ResetPWHeader = () => (
  <Box
    bgGradient="linear(to-r, #003049, #0056b3)"
    py={8}
    px={8}
    textAlign="center"
  >
    <Flex justify="center" mb={2}>
      <Box
        bg="rgba(255, 255, 255, 0.2)"
        p={4}
        borderRadius="xl"
        backdropFilter="blur(10px)"
      >
        <Icon as={Shield} boxSize={8} color="white" />
      </Box>
    </Flex>
    <Heading color="white" size="lg" fontWeight="700" mb={2}>
      Reset Your Password
    </Heading>
    <Text color="rgba(255, 255, 255, 0.9)" fontSize="sm">
      Enter your new password below to secure your account
    </Text>
  </Box>
);

export default ResetPWHeader;
