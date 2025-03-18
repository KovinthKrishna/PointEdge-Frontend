import { create } from "zustand";

interface ModalStore {
  openUpdateProductId: number | null;
  isAddNewItemModalOpen: boolean;

  openUpdateProductModal: (productId: number) => void;
  closeUpdateProductModal: () => void;

  openAddNewItemModal: () => void;
  closeAddNewItemModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  openUpdateProductId: null,
  isAddNewItemModalOpen: false,

  openUpdateProductModal: (productId) =>
    set({ openUpdateProductId: productId }),
  closeUpdateProductModal: () => set({ openUpdateProductId: null }),

  openAddNewItemModal: () => set({ isAddNewItemModalOpen: true }),
  closeAddNewItemModal: () => set({ isAddNewItemModalOpen: false }),
}));

export default useModalStore;
