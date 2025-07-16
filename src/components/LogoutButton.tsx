import { HStack, Text } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Navigate to ClockOut page instead of logging out immediately
    navigate("/login", { replace: true });
  };

  return (
    <HStack
      as="button"
      color="white"
      bgColor="blue"
      paddingX={6}
      paddingY={2.5}
      spacing={2.5}
      borderRadius="full"
      _hover={{ bgColor: "darkBlue" }}
      onClick={handleLogout}
    >
      <Text fontSize={20}>Logout</Text>
      <FiLogOut size={30} />
    </HStack>
  );
};

export default LogoutButton;
