import { useMutation, useQueryClient } from "@tanstack/react-query";
import Product from "../models/Product";
import APIClient from "../services/apiClient";
import useModalStore from "../store/useModalStore";
import useProductMutationStore from "../store/useProductMutationStore";
import useCustomToast from "./useCustomToast";

const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const setLoading = useProductMutationStore((s) => s.setLoading);
  const closeUpdateProductModal = useModalStore(
    (s) => s.closeUpdateProductModal
  );
  const toast = useCustomToast();

  return useMutation({
    mutationFn: (updatedProduct: Product) =>
      new APIClient<Product>("/products").put(updatedProduct),
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

      closeUpdateProductModal();
      toast.success("Product updated successfully!");
    },
    onSettled: () => {
      setLoading(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useUpdateProduct;
