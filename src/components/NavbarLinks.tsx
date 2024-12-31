import { VStack } from "@chakra-ui/react";
import navigationData from "../data/navigationData";
import NavbarButton from "./NavbarButton";

const NavbarLinks = () => {
  return (
    <VStack width="full" spacing={{ base: 2, lg: 5 }}>
      {navigationData.map((navigation, index) => (
        <NavbarButton
          key={index}
          icon={navigation.icon}
          label={navigation.label}
          url={navigation.url}
        />
      ))}
    </VStack>
  );
};

export default NavbarLinks;
