import { useMutation, useQueryClient } from "@tanstack/react-query";
import Product from "../models/Product";
import APIClient from "../services/apiClient";
import useProductFormStore from "../store/useProductFormStore";
import useProductFormValidation from "../utils/useProductFormValidation";
import useBrands from "./useBrands";
import useCategories from "./useCategories";

const useAddProduct = () => {
  const validateForm = useProductFormValidation();

  const name = useProductFormStore((s) => s.name);
  const quantity = useProductFormStore((s) => s.quantity);
  const brand = useProductFormStore((s) => s.brand);
  const category = useProductFormStore((s) => s.category);
  const price = useProductFormStore((s) => s.price);

  const { data: brandsData } = useBrands();
  const { data: categoriesData } = useCategories();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newProduct: Product) =>
      new APIClient<Product>("/products").post(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Error adding product:", error);
    },
  });

  const addProduct = (hidden: boolean) => {
    const isValid = validateForm();
    if (!isValid) return;

    const selectedBrand = brandsData?.find((b) => b.id === Number(brand));
    const selectedCategory = categoriesData?.find(
      (c) => c.id === Number(category)
    );
    if (!selectedBrand || !selectedCategory) {
      return;
    }

    const newProduct: Product = {
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

export default useAddProduct;
