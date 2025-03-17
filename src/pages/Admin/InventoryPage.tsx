import { Box } from "@chakra-ui/react";
import InventoryPageTop from "../../components/Admin/InventoryPage/InventoryPageTop";
import ProductList from "../../components/ProductList";

const InventoryPage = () => {
  return (
    <>
      <InventoryPageTop />
      <Box paddingY={4} paddingX={{ base: 4, lg: 8, xl: 16 }}>
        <ProductList />
      </Box>
    </>
  );
};

export default InventoryPage;
