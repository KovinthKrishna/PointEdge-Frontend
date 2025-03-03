import { create } from "zustand";

interface ProductFormStore {
  name: string;
  price: string;
  quantity: string;
  brand: string;
  category: string;
  setFormData: (name: string, value: string) => void;
  resetFormData: () => void;
}

const useProductFormStore = create<ProductFormStore>((set) => ({
  name: "",
  price: "",
  quantity: "",
  brand: "",
  category: "",
  setFormData: (name, value) => set((store) => ({ ...store, [name]: value })),
  resetFormData: () =>
    set({
      name: "",
      price: "",
      quantity: "",
      brand: "",
      category: "",
    }),
}));

export default useProductFormStore;
