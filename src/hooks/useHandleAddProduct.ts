import useProductFormStore from "../store/useProductFormStore";
import useAddProduct from "./useAddProduct";
import useBrands from "./useBrands";
import useCategories from "./useCategories";
import useProductFormValidation from "./useProductFormValidation";

const useHandleAddProduct = () => {
  const validateForm = useProductFormValidation();
  const mutation = useAddProduct();

  const name = useProductFormStore((s) => s.name)
    .trim()
    .replace(/\s+/g, " ");
  const quantity = useProductFormStore((s) => s.quantity).trim();
  const brand = useProductFormStore((s) => s.brand);
  const category = useProductFormStore((s) => s.category);
  const price = useProductFormStore((s) => s.price).trim();

  const { data: brandsData } = useBrands();
  const { data: categoriesData } = useCategories();

  const addProduct = (hidden: boolean) => {
    if (!validateForm()) return;

    const selectedBrand = brandsData?.find((b) => b.id === Number(brand));
    const selectedCategory = categoriesData?.find(
      (c) => c.id === Number(category)
    );
    if (!selectedBrand || !selectedCategory) return;

    const newProduct = {
      id: 0,
      name,
      price: Number(price),
      stockQuantity: Number(quantity),
      hidden,
      brand: selectedBrand,
      category: selectedCategory,
    };

    mutation.mutate(newProduct);
  };

  return addProduct;
};

export default useHandleAddProduct;
