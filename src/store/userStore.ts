import { create } from "zustand";

type User = null | {
  phoneNumber: string;
  name: string;
  uid: string;
  [key: string]: any;
};

type StoreType = {
  state: {
    loggedInUser: User;
  };
  actions: {
    setLoggedInUser: (user: User) => void;
  };
};

const useUserStore = create<StoreType>((set) => ({
  state: {
    loggedInUser: null,
  },
  actions: {
    setLoggedInUser: (user: User) =>
      set((state) => ({ state: { ...state.state, loggedInUser: user } })),
  },
}));

export const useUserStates = () => useUserStore((state) => state.state);
export const useUserActions = () => useUserStore((state) => state.actions);

export default useUserStore;
