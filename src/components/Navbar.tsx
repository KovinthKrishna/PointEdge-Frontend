import { Heading, HStack, Image, VStack } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import NavbarLinks from "./NavbarLinks";

const Navbar = () => {
  return (
    <VStack
      paddingX={2.5}
      paddingTop={5}
      borderRight="2px"
      borderColor="lightBlue"
      height="100vh"
      spacing={10}
    >
      <HStack
        padding={2}
        border="2px"
        borderColor="lightBlue"
        borderRadius={10}
      >
        <Image src={logo} height={105} width={105} />
        <Heading fontSize={32} color="lightBlue">
          Point Edge
        </Heading>
      </HStack>
      <NavbarLinks />
    </VStack>
  );
};

export default Navbar;
