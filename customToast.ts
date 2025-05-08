import { Box, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

export const useCustomToast = () => {
  const toast = useToast();

  return (message: string, status: "error" | "success" | "info") => {
    toast({
      position: "bottom",
      duration: 3000,
      isClosable: true,
      render: () => (
        <Box
          color="white"
          bg={status === "success" ? "green" : status === "error" ? "red" : "blue"}
          p={3}
          borderRadius="md"
          boxShadow="md"
        >
          <Text>{message}</Text>
        </Box>
      ),
    });
  };
};