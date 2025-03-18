import { useMutation, useQueryClient } from "@tanstack/react-query";
import Product from "../models/Product";
import productService from "../services/productService";
import useModalStore from "../store/useModalStore";
import useProductMutationStore from "../store/useProductMutationStore";
import useCustomToast from "./useCustomToast";
import useManageProductImage from "./useManageProductImage";

const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const setLoading = useProductMutationStore((s) => s.setLoading);
  const closeUpdateProductModal = useModalStore(
    (s) => s.closeUpdateProductModal
  );
  const manageProductImage = useManageProductImage();
  const toast = useCustomToast();

  return useMutation({
    mutationFn: (updatedProduct: Product) => productService.put(updatedProduct),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data, variables) => {
      manageProductImage(data).finally(() => {
        queryClient
          .invalidateQueries({ queryKey: ["products"] })
          .then(() => {
            if (variables.brand.id == 0) {
              queryClient.invalidateQueries({ queryKey: ["brands"] });
            }
          })
          .then(() => {
            if (variables.category.id == 0) {
              queryClient.invalidateQueries({ queryKey: ["categories"] });
            }
          });
      });

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
