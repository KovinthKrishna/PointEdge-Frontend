import { useMutation, useQueryClient } from "@tanstack/react-query";
import Product from "../models/Product";
import productService from "../services/productService";
import useModalStore from "../store/useModalStore";
import useProductMutationStore from "../store/useProductMutationStore";
import useCustomToast from "./useCustomToast";
import useManageProductImage from "./useManageProductImage";

const useAddProduct = () => {
  const queryClient = useQueryClient();
  const setLoading = useProductMutationStore((s) => s.setLoading);
  const closeAddNewItemModal = useModalStore((s) => s.closeAddNewItemModal);
  const manageProductImage = useManageProductImage();
  const toast = useCustomToast();

  return useMutation({
    mutationFn: (newProduct: Product) => productService.post(newProduct),
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
