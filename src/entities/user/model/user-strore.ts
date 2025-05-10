import { create } from "zustand";
import { combine } from "zustand/middleware";
import type { User } from "../";

export const useUserStore = create(
  combine(
    {
      isCreatingModalOpened: false,
      editingUser: null as null | User,
    },
    (set) => {
      return {
        setCreatingModalOpened: (value: boolean) =>
          set((state) => ({ ...state, isCreatingModalOpened: value })),
        setEditingUser: (user: User | null) => {
          set((state) => ({ ...state, editingUser: user }));
        },
      };
    },
  ),
);
