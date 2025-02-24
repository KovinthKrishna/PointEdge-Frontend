import { SimpleGrid, Text } from "@chakra-ui/react";
import timePeriods from "../../../data/timePeriods";
import useBrands from "../../../hooks/useBrands";
import useCategories from "../../../hooks/useCategories";
import useProductOrderQueryStore from "../../../store/useProductOrderQueryStore";
import FilterMenu from "../../FilterMenu";

const DashboardFilters = () => {
  const { data: brandsData } = useBrands();
  const { data: categoriesData } = useCategories();

  const productOrderQuery = useProductOrderQueryStore(
    (s) => s.productOrderQuery
  );
  const setBrandId = useProductOrderQueryStore((s) => s.setBrandId);
  const setCategoryId = useProductOrderQueryStore((s) => s.setCategoryId);
  const setTimeFilter = useProductOrderQueryStore((s) => s.setTimeFilter);

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
        <FilterMenu
          filterType="Brand"
          options={brandsData ?? []}
          selectedOptionId={productOrderQuery.brandId}
          setSelectedOptionId={setBrandId}
        />
        <FilterMenu
          filterType="Category"
          options={categoriesData ?? []}
          selectedOptionId={productOrderQuery.categoryId}
          setSelectedOptionId={setCategoryId}
        />
        <FilterMenu
          filterType="Time"
          options={timePeriods}
          selectedOptionId={productOrderQuery.timeFilter}
          setSelectedOptionId={setTimeFilter}
        />
      </SimpleGrid>
    </SimpleGrid>
  );
};

export default DashboardFilters;
