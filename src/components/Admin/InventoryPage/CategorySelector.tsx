import useCategories from "../../../hooks/useCategories";
import FormSelect from "./FormSelect";

const CategorySelector = () => {
  const { data: categoriesData } = useCategories();

  return <FormSelect name="category" fetchedOptions={categoriesData ?? []} />;
};

export default CategorySelector;
