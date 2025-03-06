import useHandleProduct from "./useHandleProduct";
import useUpdateProduct from "./useUpdateProduct";

const useHandleUpdateProduct = () => {
  const mutation = useUpdateProduct();
  const getProductObject = useHandleProduct();

  const updateProduct = (id: number, hidden: boolean) => {
    const updatedProduct = getProductObject(id, hidden);

    if (updatedProduct) {
      mutation.mutate(updatedProduct);
    }
  };

  return updateProduct;
};

export default useHandleUpdateProduct;
