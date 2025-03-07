import { Text } from "@chakra-ui/react";

interface ForgotPasswordProps {
  onForgotPassword: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  onForgotPassword,
}) => {
  return (
    <Text
      fontSize="xs"
      textDecoration="underline"
      color="#008ED8"
      textAlign="center"
      cursor="pointer"
      _hover={{ textDecoration: "underline" }}
      onClick={onForgotPassword}
    >
      I forgot my password
    </Text>
  );
};

export default ForgotPassword;
