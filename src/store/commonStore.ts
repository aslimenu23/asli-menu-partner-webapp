import { create } from "zustand";

type StoreType = {
  state: {
    snackbarMessage: string;
    resChoices: null | {
      cuisines: string[];
      dishCategories: string[];
      dishNames: string[];
    };
  };
  actions: {
    setSnackbarMessage: (snackbarMessage: string) => void;
    setResChoices: (resChoices: any) => void;
    setCategoryList: (categoryList: any[]) => void;
    setDishNameList: (dishNameList: any[]) => void;
    setCuisines: (cuisines: any[]) => void;
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
    setCategoryList: (categoryList: any[]) => {
      set({
        state: {
          ...get().state,
          // @ts-ignore
          resChoices: {
            ...get().state.resChoices,
            dishCategories: categoryList,
          },
        },
      });
    },
    setDishNameList: (dishNameList: any[]) =>
      set({
        state: {
          ...get().state,
          // @ts-ignore
          resChoices: {
            ...get().state.resChoices,
            dishNames: dishNameList,
          },
        },
      }),
    setCuisines: (cuisines: any[]) =>
      set({
        state: {
          ...get().state,
          // @ts-ignore
          resChoices: {
            ...get().state.resChoices,
            cuisines,
          },
        },
      }),
  },
}));

export const useCommonStates = () => useCommonStore((state) => state.state);
export const useCommonActions = () => useCommonStore((state) => state.actions);

export default useCommonStore;
