import { create } from "zustand";

interface ProductOrderQuery {
  brandId?: number;
  categoryId?: number;
  timeFilter?: string;
}

interface ProductOrderQueryStore {
  productOrderQuery: ProductOrderQuery;
  setBrandId: (id?: number) => void;
  setCategoryId: (id?: number) => void;
  setTimeFilter: (id?: string) => void;
}

const useProductOrderQueryStore = create<ProductOrderQueryStore>((set) => ({
  productOrderQuery: {},

  setBrandId: (id) =>
    set((store) => ({
      productOrderQuery: {
        ...store.productOrderQuery,
        brandId: id,
      },
    })),

  setCategoryId: (id) =>
    set((store) => ({
      productOrderQuery: {
        ...store.productOrderQuery,
        categoryId: id,
      },
    })),

  setTimeFilter: (id) =>
    set((store) => ({
      productOrderQuery: {
        ...store.productOrderQuery,
        timeFilter: id,
      },
    })),
}));

export default useProductOrderQueryStore;
