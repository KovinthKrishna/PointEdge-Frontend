import { create } from "zustand";

interface OrderSummaryState {
  amount: number;
  totalDiscount: number;
  total: number;
  setAmount: (amount: number) => void;
  setTotalDiscount: (discount: number) => void;
  setTotal: (total: number) => void;
  resetSummary: () => void;
}

const useOrderSummaryStore = create<OrderSummaryState>((set) => ({
  amount: 0,
  totalDiscount: 0,
  total: 0,
  setAmount: (amount) => set({ amount }),
  setTotalDiscount: (totalDiscount) => set({ totalDiscount }),
  setTotal: (total) => set({ total }),
  resetSummary: () => set({ amount: 0, totalDiscount: 0, total: 0 }),
}));

export default useOrderSummaryStore;
