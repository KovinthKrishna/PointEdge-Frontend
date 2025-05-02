import { create } from "zustand";

interface ProductMutationStore {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const useProductMutationStore = create<ProductMutationStore>((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}));

export default useProductMutationStore;
