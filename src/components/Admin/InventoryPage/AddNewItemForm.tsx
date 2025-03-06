import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
import useHandleAddProduct from "../../../hooks/useHandleAddProduct";
import useProductFormErrorStore from "../../../store/useProductFormErrorStore";
import useProductFormStore from "../../../store/useProductFormStore";
import useProductMutationStore from "../../../store/useProductMutationStore";
import ProductForm from "./ProductForm";

const AddNewItemForm = () => {
  const isLoading = useProductMutationStore((s) => s.isLoading);
  const resetFormData = useProductFormStore((s) => s.resetFormData);
  const resetFormError = useProductFormErrorStore((s) => s.resetFormError);

  const addProduct = useHandleAddProduct();

  useEffect(() => {
    resetFormData();
    resetFormError();
  }, [resetFormData, resetFormError]);

  return (
    <ProductForm>
      <Button
        isLoading={isLoading}
        bgColor="blue"
        _hover={{ bgColor: "darkBlue" }}
        onClick={() => addProduct(false)}
      >
        Save
      </Button>
      <Button
        isLoading={isLoading}
        bgColor="blue"
        _hover={{ bgColor: "darkBlue" }}
        onClick={() => {
          resetFormData();
          resetFormError();
        }}
      >
        Clear
      </Button>
      <Button
        isLoading={isLoading}
        bgColor="blue"
        _hover={{ bgColor: "darkBlue" }}
        onClick={() => addProduct(true)}
      >
        Save & Hide
      </Button>
    </ProductForm>
  );
};

export default AddNewItemForm;
