import { HStack, Text } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";

const LogoutButton = () => {
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
    >
      <Text fontSize={20}>Logout</Text>
      <FiLogOut size={30} />
    </HStack>
  );
};

export default LogoutButton;
