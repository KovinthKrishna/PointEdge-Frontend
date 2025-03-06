import Product from "../models/Product";
import useProductFormStore from "../store/useProductFormStore";
import useBrands from "./useBrands";
import useCategories from "./useCategories";
import useProductFormValidation from "./useProductFormValidation";

const useHandleProduct = () => {
  const validateForm = useProductFormValidation();

  const name = useProductFormStore((s) => s.name)
    .trim()
    .replace(/\s+/g, " ");
  const quantity = useProductFormStore((s) => s.quantity).trim();
  const brand = useProductFormStore((s) => s.brand);
  const category = useProductFormStore((s) => s.category);
  const price = useProductFormStore((s) => s.price).trim();

  const { data: brandsData } = useBrands();
  const { data: categoriesData } = useCategories();

  const getProductObject = (id: number, hidden: boolean) => {
    if (!validateForm()) return null;

    const selectedBrand = isNaN(Number(brand))
      ? { id: 0, name: brand }
      : brandsData?.find((b) => b.id === Number(brand));
    const selectedCategory = isNaN(Number(category))
      ? { id: 0, name: category }
      : categoriesData?.find((c) => c.id === Number(category));

    if (!selectedBrand || !selectedCategory) return null;

    return {
      id,
      name,
      price: Math.floor(Number(price) * 100) / 100,
      stockQuantity: Number(quantity),
      hidden,
      brand: selectedBrand,
      category: selectedCategory,
    } as Product;
  };

  return getProductObject;
};

export default useHandleProduct;
