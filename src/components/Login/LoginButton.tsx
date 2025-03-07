import { Box, Button } from "@chakra-ui/react";

interface LoginButtonProps {
  isLoading: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({ isLoading }) => {
  return (
    <Box display="flex" justifyContent="center">
      <Button
        type="submit"
        bg="#003049"
        color="white"
        width="60%"
        isLoading={isLoading}
        _hover={{ bg: "#002637" }} // Darker shade for hover effect
        borderRadius="6px"
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginButton;
