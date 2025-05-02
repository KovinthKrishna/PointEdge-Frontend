import { SimpleGrid } from "@chakra-ui/react";
import BrandFilter from "../../BrandFilter";
import CategoryFilter from "../../CategoryFilter";

const InventoryPageFilters = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
      <BrandFilter />
      <CategoryFilter />
    </SimpleGrid>
  );
};

export default InventoryPageFilters;
