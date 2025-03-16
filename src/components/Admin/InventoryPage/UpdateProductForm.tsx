import { Button } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import useHandleUpdateProduct from "../../../hooks/useHandleUpdateProduct";
import Product from "../../../models/Product";
import { getProductImageUrl } from "../../../services/apiClient";
import useProductFormErrorStore from "../../../store/useProductFormErrorStore";
import useProductFormStore from "../../../store/useProductFormStore";
import useProductMutationStore from "../../../store/useProductMutationStore";
import ProductForm from "./ProductForm";

interface Props {
  product: Product;
}

const UpdateProductForm = ({ product }: Props) => {
  const isLoading = useProductMutationStore((s) => s.isLoading);
  const setFormData = useProductFormStore((s) => s.setFormData);
  const resetFormData = useProductFormStore((s) => s.resetFormData);
  const resetFormError = useProductFormErrorStore((s) => s.resetFormError);
  const updateProduct = useHandleUpdateProduct();

  const populateForm = useCallback(() => {
    setFormData("name", product.name);
    setFormData("price", product.price.toString());
    setFormData("quantity", product.stockQuantity.toString());
    setFormData("brand", product.brand.id.toString());
    setFormData("category", product.category.id.toString());
    setFormData("minimum", product.minimumQuantity.toString());
    if (product.imageName) {
      setFormData("existingImageUrl", getProductImageUrl(product.imageName));
    }
    setFormData("newImageFile", null);
  }, [product, setFormData]);

  useEffect(() => {
    populateForm();
    return () => {
      resetFormData();
      resetFormError();
    };
  }, [populateForm, resetFormData, resetFormError]);

  return (
    <ProductForm>
      <Button
        isLoading={isLoading}
        bgColor="blue"
        _hover={{ bgColor: "darkBlue" }}
        onClick={() => updateProduct(product.id, product.hidden)}
      >
        Save
      </Button>
      <Button
        isLoading={isLoading}
        bgColor="blue"
        _hover={{ bgColor: "darkBlue" }}
        onClick={() => {
          populateForm();
          resetFormError();
        }}
      >
        Reset
      </Button>
      <Button
        isLoading={isLoading}
        bgColor="blue"
        _hover={{ bgColor: "darkBlue" }}
        onClick={() => updateProduct(product.id, !product.hidden)}
      >
        {product.hidden ? "Save & Unhide" : "Save & Hide"}
      </Button>
    </ProductForm>
  );
};

export default UpdateProductForm;
