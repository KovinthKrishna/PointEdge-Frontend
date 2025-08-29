import {
  Box,
  HStack,
  Image,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import logo from "../../assets/logo.png";
import BarcodeButton from "../BarcodeButton";
import BrandFilter from "../BrandFilter";
import CategoryFilter from "../CategoryFilter";
import ProfileButton from "../ProfileButton";
import SearchBox from "../SearchBox";
import ReturnRefundManager from "../ReturnAndRefund/ReturnRefundManager";
import RefundRequestsButton from "../ReturnAndRefund/RefundRequestButton";

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
        <ReturnRefundManager />
      </HStack>

      <HStack justifyContent="space-between">
        <SimpleGrid columns={2} spacing={4} width="60%" maxWidth={480}>
          <BrandFilter />
          <CategoryFilter />
        </SimpleGrid>
        <RefundRequestsButton />
        <ProfileButton />
      </HStack>
    </Box>
  );
};

export default ProductsPanelTop;
