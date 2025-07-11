import { Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Text
      fontSize="xs"
      textDecoration="underline"
      color="#008ED8"
      textAlign="center"
      cursor="pointer"
      _hover={{ textDecoration: "underline" }}
      onClick={() => navigate("/forgot-password")}
    >
      I forgot my password
    </Text>
  );
};

export default ForgotPassword;
