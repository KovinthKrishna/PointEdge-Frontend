import { SimpleGrid, Text } from "@chakra-ui/react";
import timePeriods from "../../../data/timePeriods";
import useBrands from "../../../hooks/useBrands";
import useCategories from "../../../hooks/useCategories";
import useProductQueryStore from "../../../store/useProductQueryStore";
import FilterMenu from "../../FilterMenu";

const DashboardFilters = () => {
  const { data: brandsData } = useBrands();
  const { data: categoriesData } = useCategories();

  const { productQuery, setBrandId, setCategoryId, setTimeFilter } =
    useProductQueryStore();

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
          selectedOptionId={productQuery.brandId}
          setSelectedOptionId={setBrandId}
        />
        <FilterMenu
          filterType="Category"
          options={categoriesData ?? []}
          selectedOptionId={productQuery.categoryId}
          setSelectedOptionId={setCategoryId}
        />
        <FilterMenu
          filterType="Time"
          options={timePeriods}
          selectedOptionId={productQuery.timeFilter}
          setSelectedOptionId={setTimeFilter}
        />
      </SimpleGrid>
    </SimpleGrid>
  );
};

export default DashboardFilters;
