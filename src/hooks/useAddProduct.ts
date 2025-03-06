import { useMutation, useQueryClient } from "@tanstack/react-query";
import Product from "../models/Product";
import APIClient from "../services/apiClient";
import useModalStore from "../store/useModalStore";
import useProductMutationStore from "../store/useProductMutationStore";
import useCustomToast from "./useCustomToast";

const useAddProduct = () => {
  const queryClient = useQueryClient();
  const setLoading = useProductMutationStore((s) => s.setLoading);
  const closeAddNewItemModal = useModalStore((s) => s.closeAddNewItemModal);
  const toast = useCustomToast();

  return useMutation({
    mutationFn: (newProduct: Product) =>
      new APIClient<Product>("/products").post(newProduct),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });

      if (variables.brand.id == 0) {
        queryClient.invalidateQueries({ queryKey: ["brands"] });
      }

      if (variables.category.id == 0) {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      }

      closeAddNewItemModal();
      toast.success("Product added successfully!");
    },
    onSettled: () => {
      setLoading(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useAddProduct;
