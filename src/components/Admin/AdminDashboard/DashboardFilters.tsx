import { SimpleGrid, Text } from "@chakra-ui/react";
import BrandFilter from "../../BrandFilter";
import CategoryFilter from "../../CategoryFilter";
import TimeFilter from "../TimeFilter";

const DashboardFilters = () => {
  return (
    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      gridTemplateColumns={{ lg: "30% 70%" }}
      paddingX={6}
      paddingY={2}
      spacingY={5}
    >
      <Text fontWeight="bold" alignContent="center">
        Ordered Items
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
        <BrandFilter />
        <CategoryFilter />
        <TimeFilter />
      </SimpleGrid>
    </SimpleGrid>
  );
};

export default DashboardFilters;
