import { create } from "zustand";

interface ModalStore {
  openUpdateProductId: number | null;
  isAddNewItemModalOpen: boolean;
  isTimeFilterModalOpen: boolean;

  openUpdateProductModal: (productId: number) => void;
  closeUpdateProductModal: () => void;

  openAddNewItemModal: () => void;
  closeAddNewItemModal: () => void;

  openTimeFilterModal: () => void;
  closeTimeFilterModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  openUpdateProductId: null,
  isAddNewItemModalOpen: false,
  isTimeFilterModalOpen: false,

  openUpdateProductModal: (productId) =>
    set({ openUpdateProductId: productId }),
  closeUpdateProductModal: () => set({ openUpdateProductId: null }),

  openAddNewItemModal: () => set({ isAddNewItemModalOpen: true }),
  closeAddNewItemModal: () => set({ isAddNewItemModalOpen: false }),

  openTimeFilterModal: () => set({ isTimeFilterModalOpen: true }),
  closeTimeFilterModal: () => set({ isTimeFilterModalOpen: false }),
}));

export default useModalStore;
