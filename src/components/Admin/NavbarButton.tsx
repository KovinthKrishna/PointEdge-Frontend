import { HStack, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";
import usePathSegment from "../../hooks/usePathSegment";
import useProductQueryStore from "../../store/useProductQueryStore";
import theme from "../../theme";

interface Props {
  label: string;
  url: string;
  icon: IconType;
}

const NavbarButton = ({ icon: Icon, label, url }: Props) => {
  const active = usePathSegment(1) === url;
  const resetAll = useProductQueryStore((s) => s.resetAll);

  return (
    <Link
      to={url ? `/admin/${url}` : "/admin"}
      style={{ width: "100%" }}
      onClick={resetAll}
    >
      <HStack
        paddingX={2}
        paddingY={{ base: 1, lg: 2.5 }}
        spacing={4}
        border="2px solid transparent"
        borderRadius={{ base: 0, lg: 6 }}
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
