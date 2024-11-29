/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

const useChatStore = create((set) => ({
  bears: [],
  add: (newData: string) =>
    set((state: any) => ({ bears: [...state.bears, newData] })),
  empty: () => set(() => ({ bears: [] })),
}));

export { useChatStore };
