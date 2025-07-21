import { create } from "zustand";

interface ProductQuery {
  brandId?: number;
  categoryId?: number;
  startDate?: string;
  endDate?: string;
  search?: string;
  page: number;
}

interface ProductQueryStore {
  productQuery: ProductQuery;
  setBrandId: (id?: number) => void;
  setCategoryId: (id?: number) => void;
  setTimeFilter: (startDate?: string, endDate?: string) => void;
  setSearch: (search?: string) => void;
  setPage: (page: number) => void;
  resetAll: () => void;
}

const useProductQueryStore = create<ProductQueryStore>((set) => ({
  productQuery: {
    page: 0,
  },

  setBrandId: (id) =>
    set((store) => ({
      productQuery: {
        ...store.productQuery,
        brandId: id,
        page: 0,
      },
    })),

  setCategoryId: (id) =>
    set((store) => ({
      productQuery: {
        ...store.productQuery,
        categoryId: id,
        page: 0,
      },
    })),

  setTimeFilter: (startDate, endDate) =>
    set((store) => ({
      productQuery: {
        ...store.productQuery,
        startDate,
        endDate,
        page: 0,
      },
    })),

  setSearch: (search) =>
    set((store) => ({
      productQuery: {
        ...store.productQuery,
        search,
        page: 0,
      },
    })),

  setPage: (page) =>
    set((store) => ({
      productQuery: {
        ...store.productQuery,
        page,
      },
    })),

  resetAll: () =>
    set(() => ({
      productQuery: {
        page: 0,
      },
    })),
}));

export default useProductQueryStore;
