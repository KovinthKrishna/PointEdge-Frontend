import useAddProduct from "./useAddProduct";
import useHandleProduct from "./useHandleProduct";

const useHandleAddProduct = () => {
  const mutation = useAddProduct();
  const getProductObject = useHandleProduct();

  const addProduct = (hidden: boolean) => {
    const newProduct = getProductObject(0, hidden);

    if (newProduct) {
      mutation.mutate(newProduct);
    }
  };

  return addProduct;
};

export default useHandleAddProduct;
