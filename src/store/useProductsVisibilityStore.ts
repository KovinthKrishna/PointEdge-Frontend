import { create } from "zustand";

interface ProductsVisibilityStore {
  isShowingHiddenProducts: boolean;
  toggleProductsVisibility: () => void;
}

const useProductsVisibilityStore = create<ProductsVisibilityStore>((set) => ({
  isShowingHiddenProducts: false,
  toggleProductsVisibility: () =>
    set((store) => ({
      isShowingHiddenProducts: !store.isShowingHiddenProducts,
    })),
}));

export default useProductsVisibilityStore;
