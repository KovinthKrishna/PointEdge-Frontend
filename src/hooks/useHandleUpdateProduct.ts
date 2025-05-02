import useHandleProduct from "./useHandleProduct";
import useUpdateProduct from "./useUpdateProduct";

const useHandleUpdateProduct = () => {
  const mutation = useUpdateProduct();
  const getProductObject = useHandleProduct();

  return (id: number, hidden: boolean) => {
    const updatedProduct = getProductObject(id, hidden);

    if (updatedProduct) {
      mutation.mutate(updatedProduct);
    }
  };
};

export default useHandleUpdateProduct;
