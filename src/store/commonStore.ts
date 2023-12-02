import { create } from "zustand";

type StoreType = {
  state: {
    snackbarMessage: string;
    resChoices: any;
  };
  actions: {
    setSnackbarMessage: (snackbarMessage: string) => void;
    setResChoices: (resChoices: any) => void;
  };
};

const useCommonStore = create<StoreType>((set, get) => ({
  state: {
    snackbarMessage: "",
    resChoices: null,
  },
  actions: {
    setSnackbarMessage: (snackbarMessage) =>
      set({ state: { ...get().state, snackbarMessage } }),
    setResChoices: (resChoices) =>
      set({ state: { ...get().state, resChoices } }),
  },
}));

export const useCommonStates = () => useCommonStore((state) => state.state);
export const useCommonActions = () => useCommonStore((state) => state.actions);

export default useCommonStore;
