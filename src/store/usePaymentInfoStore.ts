import { create } from "zustand";

interface PaymentInfo {
  cashAmount: number;
  cardAmount: number;
}

interface PaymentInfoStore {
  paymentInfo: PaymentInfo | null;
  setPaymentInfo: (info: PaymentInfo) => void;
}

const usePaymentInfoStore = create<PaymentInfoStore>((set) => ({
  paymentInfo: null,
  setPaymentInfo: (info) => set({ paymentInfo: info }),
}));

export default usePaymentInfoStore;
