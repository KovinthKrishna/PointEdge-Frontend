import { create } from "zustand";

interface SearchStore {
  search: string;
  setSearch: (searchTerm: string) => void;
}

const useSearchStore = create<SearchStore>((set) => ({
  search: "",
  setSearch: (searchTerm) => set({ search: searchTerm }),
}));

export default useSearchStore;
