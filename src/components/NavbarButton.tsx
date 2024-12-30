import { HStack, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { Link, useLocation } from "react-router-dom";
import theme from "../theme";

interface Props {
  icon: IconType;
  label: string;
  url: string;
}

const NavbarButton = ({ icon: Icon, label, url }: Props) => {
  const { pathname } = useLocation();
  const path = `/admin/${url}`;
  const active = pathname === path;

  return (
    <Link to={path} style={{ width: "100%" }}>
      <HStack
        paddingX={2}
        paddingY={2.5}
        spacing={4}
        border="2px solid transparent"
        borderRadius={6}
        bgColor={active ? "lightBlue" : "transparent"}
        _hover={{ borderColor: "lightBlue" }}
      >
        <Icon
          size={20}
          color={active ? theme.colors.white : theme.colors.lightBlue}
        />
        <Text fontSize={20} color={active ? "white" : "lightBlue"}>
          {label}
        </Text>
      </HStack>
    </Link>
  );
};

export default NavbarButton;
