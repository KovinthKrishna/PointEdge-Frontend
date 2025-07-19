import { create } from "zustand";

interface CustomerInfo {
  name: string;
  loyaltyPoints: number;
}

interface CustomerStore {
  customerInfo: CustomerInfo | null;
  setCustomerInfo: (info: CustomerInfo) => void;
  clearCustomerInfo: () => void;
}

export const useCustomerStore = create<CustomerStore>((set) => ({
  customerInfo: null,
  setCustomerInfo: (info) => set({ customerInfo: info }),
  clearCustomerInfo: () => set({ customerInfo: null }),
}));
