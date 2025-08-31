import { create } from "zustand";
import { InvoiceItem } from "../models/Invoice";
import { RefundStep } from "../models/RefundStep";

interface RefundStore {
  invoiceNumber: string;
  selectedItems: InvoiceItem[];
  currentStep: RefundStep;
  refundMethod?:string;
  refundAmount:number;
  refundRequestId?: number|null;
  setRefundRequestId: (id: number|null) => void;
  setRefundState: (update: Partial<RefundStore> | ((state: RefundStore) => Partial<RefundStore>)) => void;
  resetRefundState: () => void; 
}

export const useRefundStore = create<RefundStore>((set) => ({
  invoiceNumber: "",
  selectedItems: [],
  currentStep: RefundStep.ITEM_SELECTION,
  refundMethod: undefined,
  refundAmount: 0,
  refundRequestId: null,
  setRefundRequestId: (id) => set({ refundRequestId: id }),
  setRefundState: (update) =>
    set((state) =>
      typeof update === "function"
        ? { ...state, ...update(state) }
        : { ...state, ...update }
    ),
  resetRefundState: () =>
    set({
      invoiceNumber: "",
      selectedItems: [],
      currentStep: RefundStep.ITEM_SELECTION,
      refundMethod: undefined,
      refundAmount: 0,
      refundRequestId: null,
    }),
}));