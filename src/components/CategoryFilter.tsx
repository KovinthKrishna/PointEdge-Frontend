import useCategories from "../hooks/useCategories";
import useProductQueryStore from "../store/useProductQueryStore";
import FilterMenu from "./FilterMenu";

const CategoryFilter = () => {
  const { data: categoriesData } = useCategories();
  const categoryId = useProductQueryStore((s) => s.productQuery.categoryId);
  const setCategoryId = useProductQueryStore((s) => s.setCategoryId);

  return (
    <FilterMenu
      filterType="Category"
      options={categoriesData ?? []}
      selectedOptionId={categoryId}
      setSelectedOptionId={setCategoryId}
    />
  );
};

export default CategoryFilter;
