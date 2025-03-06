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

    const validateField = (key: string, value: string, message: string) => {
      if (!value.trim()) {
        setFormError(key, message);
        hasError = true;
      }
    };
    validateField("name", name, "Name is required");
    validateField("quantity", quantity, "Quantity is required");
    validateField("brand", brand, "Brand is required");
    validateField("category", category, "Category is required");
    validateField("price", price, "Price is required");

    if (
      quantity.trim() &&
      (isNaN(Number(quantity)) ||
        Number(quantity) < 0 ||
        !Number.isInteger(Number(quantity)))
    ) {
      setFormError("quantity", "Quantity must be a positive integer");
      hasError = true;
    }

    if (price.trim() && (isNaN(Number(price)) || Number(price) < 0)) {
      setFormError("price", "Price must be a positive number");
      hasError = true;
    }

    return !hasError;
  }, [name, quantity, brand, category, price, setFormError, resetFormError]);

  return validateForm;
};

export default useProductFormValidation;
