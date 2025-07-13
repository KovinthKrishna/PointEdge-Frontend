import { Text, Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" mt={20}>
      <Text fontSize="2xl" color="red.500">
        Unauthorized Access
      </Text>
      <Text mt={2}>You don’t have permission to view this page.</Text>
      <Button mt={4} colorScheme="blue" onClick={() => navigate("/login")}>
        Go to Login
      </Button>
    </Box>
  );
};

export default Unauthorized;
