import { Box, Button, HStack, Image, SimpleGrid } from "@chakra-ui/react";
import logo from "../../assets/logo.png";
import BarcodeButton from "../BarcodeButton";
import BrandFilter from "../BrandFilter";
import CategoryFilter from "../CategoryFilter";
import ProfileButton from "../ProfileButton";
import SearchBox from "../SearchBox";

const ProductsPanelTop = () => {
  return (
    <Box
      paddingY={6}
      position="sticky"
      top={0}
      bgColor="background"
      zIndex={1050}
    >
      <HStack>
        <Image src={logo} height={105} width={105} />
        <SearchBox />
        <BarcodeButton isAdmin={false} />
        <Button
          variant="outline"
          color="darkBlue"
          border="2px"
          height={12}
          minWidth={168}
          _hover={{
            bg: "darkBlue",
            color: "white",
            borderColor: "darkBlue",
          }}
        >
          Proceed to Return
        </Button>
      </HStack>
      <HStack justifyContent="space-between">
        <SimpleGrid columns={2} spacing={4} width="60%" maxWidth={480}>
          <BrandFilter />
          <CategoryFilter />
        </SimpleGrid>
        <ProfileButton />
      </HStack>
    </Box>
  );
};

export default ProductsPanelTop;
