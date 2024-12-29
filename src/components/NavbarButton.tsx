import { HStack, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import theme from "../theme";

interface Props {
  icon: IconType;
  label: string;
  active: boolean;
}

const NavbarButton = ({ icon: Icon, label, active }: Props) => {
  return (
    <HStack
      width="100%"
      paddingX={2}
      paddingY={2.5}
      spacing={5}
      border="2px solid transparent"
      borderRadius={6}
      bgColor={active ? "lightBlue" : "transparent"}
      _hover={{ borderColor: "lightBlue" }}
    >
      <Icon
        size={24}
        color={active ? theme.colors.white : theme.colors.lightBlue}
      />
      <Text fontSize={22} color={active ? "white" : "lightBlue"}>
        {label}
      </Text>
    </HStack>
  );
};

export default NavbarButton;
