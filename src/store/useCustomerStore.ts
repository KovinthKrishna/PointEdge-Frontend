import { create } from "zustand";

interface CustomerInfo {
  name: string;
  loyaltyPoints: number;
}

interface CustomerStore {
  customerInfo: CustomerInfo | null;
  discountCode: string;
  setCustomerInfo: (info: CustomerInfo) => void;
  clearCustomerInfo: () => void;
  setDiscountCode: (code: string) => void;
  clearDiscountCode: () => void;
}

export const useCustomerStore = create<CustomerStore>((set) => ({
  customerInfo: null,
  discountCode: "",
  setCustomerInfo: (info) => set({ customerInfo: info }),
  clearCustomerInfo: () => set({ customerInfo: null }),
  setDiscountCode: (code) => set({ discountCode: code }),
  clearDiscountCode: () => set({ discountCode: "" }),
}));
