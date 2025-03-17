import { VStack } from "@chakra-ui/react";
import navItems from "../../data/navItems";
import NavbarButton from "./NavbarButton";

const Navbar = () => {
  return (
    <VStack width="full" spacing={{ base: 2, lg: 5 }}>
      {navItems.map((navItem, index) => (
        <NavbarButton
          key={index}
          icon={navItem.icon}
          label={navItem.label}
          url={navItem.url}
        />
      ))}
    </VStack>
  );
};

export default Navbar;
