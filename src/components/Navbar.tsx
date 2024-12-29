import { Heading, HStack, Image, VStack } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import NavbarLinks from "./NavbarLinks";

const Navbar = () => {
  return (
    <VStack
      padding={4}
      borderRight="2px"
      borderColor="lightBlue"
      height="100vh"
      spacing={8}
    >
      <HStack
        padding={2}
        border="2px"
        borderColor="lightBlue"
        borderRadius={10}
        width="100%"
      >
        <Image src={logo} height={70} width={70} />
        <Heading fontSize={24} color="lightBlue">
          Point Edge
        </Heading>
      </HStack>
      <NavbarLinks />
    </VStack>
  );
};

export default Navbar;
