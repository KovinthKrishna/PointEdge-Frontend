import { create } from "zustand";

interface ProductFormErrorStore {
  name: string;
  price: string;
  quantity: string;
  brand: string;
  category: string;
  minimum: string;
  setFormError: (name: string, value: string) => void;
  resetFormError: () => void;
}

const useProductFormErrorStore = create<ProductFormErrorStore>((set) => ({
  name: "",
  price: "",
  quantity: "",
  brand: "",
  category: "",
  minimum: "",
  setFormError: (name, value) => set((store) => ({ ...store, [name]: value })),
  resetFormError: () =>
    set({
      name: "",
      price: "",
      quantity: "",
      brand: "",
      category: "",
      minimum: "",
    }),
}));

export default useProductFormErrorStore;
