import { useMutation, useQueryClient } from "@tanstack/react-query";
import Product from "../models/Product";
import APIClient from "../services/apiClient";

const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProduct: Product) =>
      new APIClient<Product>("/products").post(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Error adding product:", error);
    },
  });
};

export default useAddProduct;
