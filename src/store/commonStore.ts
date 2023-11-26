import { create } from "zustand";

type StoreType = {
  state: {
    snackbarMessage: string;
  };
  actions: {
    setSnackbarMessage: (snackbarMessage: string) => void;
  };
};

const useCommonStore = create<StoreType>((set) => ({
  state: {
    snackbarMessage: "",
  },
  actions: {
    setSnackbarMessage: (snackbarMessage) =>
      set({ state: { snackbarMessage } }),
  },
}));

export const useCommonStates = () => useCommonStore((state) => state.state);
export const useCommonActions = () => useCommonStore((state) => state.actions);

export default useCommonStore;
