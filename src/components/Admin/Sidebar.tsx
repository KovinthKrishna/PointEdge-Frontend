import { Box, Image, VStack } from "@chakra-ui/react";
import logo from "../../assets/logo.png";
import Navbar from "./Navbar";

const Sidebar = () => {
  return (
    <VStack
      padding={4}
      borderRight="2px"
      borderColor="lightBlue"
      height="100vh"
      spacing={8}
      position="sticky"
      top={0}
    >
      <Box
        border="2px"
        borderColor="lightBlue"
        borderRadius={10}
        width="100%"
        justifyItems="center"
      >
        <Image src={logo} height={105} width={105} />
      </Box>
      <Navbar />
    </VStack>
  );
};

export default Sidebar;
