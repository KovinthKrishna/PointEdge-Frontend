import { create } from "zustand";

interface ProductFormErrorStore {
  name: string;
  price: string;
  quantity: string;
  brand: string;
  category: string;
  setFormError: (name: string, value: string) => void;
  resetFormError: () => void;
}

const useProductFormErrorStore = create<ProductFormErrorStore>((set) => ({
  name: "",
  price: "",
  quantity: "",
  brand: "",
  category: "",
  setFormError: (name, value) => set((store) => ({ ...store, [name]: value })),
  resetFormError: () =>
    set({
      name: "",
      price: "",
      quantity: "",
      brand: "",
      category: "",
    }),
}));

export default useProductFormErrorStore;
