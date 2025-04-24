import { Box } from "@chakra-ui/react";
import ProductList from "../ProductList";
import ProductsPanelTop from "./ProductsPanelTop";

const ProductsPanel = () => {
  return (
    <Box>
      <ProductsPanelTop />
      <Box padding={4}>
        <ProductList isAdmin={false} />
      </Box>
    </Box>
  );
};

export default ProductsPanel;
