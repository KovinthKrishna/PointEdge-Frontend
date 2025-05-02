import { create } from "zustand";

interface ProductQuery {
  brandId?: number;
  categoryId?: number;
  timeFilter?: string;
}

interface ProductQueryStore {
  productQuery: ProductQuery;
  setBrandId: (id?: number) => void;
  setCategoryId: (id?: number) => void;
  setTimeFilter: (id?: string) => void;
  resetAll: () => void;
}

const useProductQueryStore = create<ProductQueryStore>((set) => ({
  productQuery: {},

  setBrandId: (id) =>
    set((store) => ({
      productQuery: {
        ...store.productQuery,
        brandId: id,
      },
    })),

  setCategoryId: (id) =>
    set((store) => ({
      productQuery: {
        ...store.productQuery,
        categoryId: id,
      },
    })),

  setTimeFilter: (id) =>
    set((store) => ({
      productQuery: {
        ...store.productQuery,
        timeFilter: id,
      },
    })),

  resetAll: () =>
    set(() => ({
      productQuery: {},
    })),
}));

export default useProductQueryStore;
