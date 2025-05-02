import { SimpleGrid } from "@chakra-ui/react";
import BarcodeDetector from "../components/BarcodeDetector";
import CartPanel from "../components/SalesDashboard/CartPanel";
import ProductsPanel from "../components/SalesDashboard/ProductsPanel";

const SalesDashboard = () => {
  return (
    <SimpleGrid
      templateColumns={"1fr 380px"}
      paddingX={{ base: 3, xl: 6 }}
      spacing={{ base: 3, xl: 6 }}
    >
      <BarcodeDetector isAdmin={false} onClose={() => {}} />
      <ProductsPanel />
      <CartPanel />
    </SimpleGrid>
  );
};

export default SalesDashboard;
