import { Box, HStack, VStack, Icon, Text } from "@chakra-ui/react";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { BiStore } from "react-icons/bi";
import { FiMapPin, FiPhone } from "react-icons/fi";

interface StoreInfoProps {
  storeName: string;
  storeAddress: string;
  storePhone: string;
}

const StoreInfo: React.FC<StoreInfoProps> = ({
  storeName,
  storeAddress,
  storePhone,
}) => (
  <Box
    textAlign="center"
    mb={6}
    pb={4}
    p={6}
    border="1px"
    borderColor="#DBEAFE"
    bgGradient="linear(to-r, #3B82F6, #2563EB, #9333EA)"
    color="#ffffffff"
    position="relative"
    boxShadow="0 4px 20px rgba(59, 130, 246, 0.3)"
    borderRadius="lg"
  >
    <Box
      position="absolute"
      top={2}
      right={2}
      opacity={0.1}
      transform="rotate(15deg)"
    >
      <Icon as={AiOutlineThunderbolt} boxSize={12} />
    </Box>
    <HStack justify="center" spacing={3} mb={3}>
      <Icon as={BiStore} color="#ffffffff" boxSize={6} />
      <Text fontSize="lg" fontWeight="bold">
        {storeName}
      </Text>
    </HStack>
    <VStack spacing={2}>
      <HStack justify="center" spacing={2}>
        <Icon as={FiMapPin} boxSize={4} />
        <Text fontSize="sm" fontWeight="medium">
          {storeAddress}
        </Text>
      </HStack>
      <HStack justify="center" spacing={2}>
        <Icon as={FiPhone} boxSize={4} />
        <Text fontSize="sm" fontWeight="medium">
          {storePhone}
        </Text>
      </HStack>
    </VStack>
  </Box>
);

export default StoreInfo;
