import useAddProduct from "./useAddProduct";
import useHandleProduct from "./useHandleProduct";

const useHandleAddProduct = () => {
  const mutation = useAddProduct();
  const getProductObject = useHandleProduct();

  return (hidden: boolean) => {
    const newProduct = getProductObject(0, hidden);

    if (newProduct) {
      mutation.mutate(newProduct);
    }
  };
};

export default useHandleAddProduct;
