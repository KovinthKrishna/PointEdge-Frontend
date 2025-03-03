import { create } from "zustand";

interface HiddenItemsStore {
  showHiddenItem: boolean;
  toggleShowHiddenItem: () => void;
}

const useHiddenItemsStore = create<HiddenItemsStore>((set) => ({
  showHiddenItem: false,
  toggleShowHiddenItem: () =>
    set((store) => ({ showHiddenItem: !store.showHiddenItem })),
}));

export default useHiddenItemsStore;
