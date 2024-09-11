import { create } from 'zustand';

type loadingStoreType = {
  isLoading: boolean;
  setLoading: () => void;
  clearLoading: () => void;
};

const useLoadingStore = create<loadingStoreType>((set) => ({
  isLoading: false,
  setLoading: () => set({ isLoading: true }),
  clearLoading: () => set({ isLoading: false }),
}));

export default useLoadingStore;
