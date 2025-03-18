import { create } from "zustand";

interface ProductFormStore {
  name: string;
  price: string;
  quantity: string;
  brand: string;
  category: string;
  minimum: string;
  existingImageUrl: string | null;
  newImageFile: File | null;
  setFormData: (name: string, value: string | File | null) => void;
  resetFormData: () => void;
}

const useProductFormStore = create<ProductFormStore>((set) => ({
  name: "",
  price: "",
  quantity: "",
  brand: "",
  category: "",
  minimum: "",
  existingImageUrl: null,
  newImageFile: null,
  setFormData: (name, value) => set((store) => ({ ...store, [name]: value })),
  resetFormData: () =>
    set({
      name: "",
      price: "",
      quantity: "",
      brand: "",
      category: "",
      minimum: "",
      existingImageUrl: null,
      newImageFile: null,
    }),
}));

export default useProductFormStore;
