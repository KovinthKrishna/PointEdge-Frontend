import { useCallback } from "react";
import useProductFormErrorStore from "../store/useProductFormErrorStore";
import useProductFormStore from "../store/useProductFormStore";

const useProductFormValidation = () => {
  const name = useProductFormStore((s) => s.name);
  const quantity = useProductFormStore((s) => s.quantity);
  const brand = useProductFormStore((s) => s.brand);
  const category = useProductFormStore((s) => s.category);
  const price = useProductFormStore((s) => s.price);
  const setFormError = useProductFormErrorStore((s) => s.setFormError);
  const resetFormError = useProductFormErrorStore((s) => s.resetFormError);

  const validateForm = useCallback(() => {
    resetFormError();

    let hasError = false;

    if (!name.trim()) {
      setFormError("name", "Name is required");
      hasError = true;
    }

    if (!quantity.trim()) {
      setFormError("quantity", "Quantity is required");
      hasError = true;
    } else if (isNaN(Number(quantity))) {
      setFormError("quantity", "Quantity must be a number");
      hasError = true;
    } else if (Number(quantity) <= 0) {
      setFormError("quantity", "Quantity must be a positive number");
      hasError = true;
    }

    if (!brand.trim()) {
      setFormError("brand", "Brand is required");
      hasError = true;
    }

    if (!category.trim()) {
      setFormError("category", "Category is required");
      hasError = true;
    }

    if (!price.trim()) {
      setFormError("price", "Price is required");
      hasError = true;
    } else if (isNaN(Number(price))) {
      setFormError("price", "Price must be a number");
      hasError = true;
    } else if (Number(price) < 0) {
      setFormError("price", "Price must be a positive number");
      hasError = true;
    }

    return !hasError;
  }, [name, quantity, brand, category, price, setFormError, resetFormError]);

  return validateForm;
};

export default useProductFormValidation;
