import { create } from "zustand";
import { combine } from "zustand/middleware";
import type { User } from "../";

export const useUserStore = create(
  combine(
    {
      editingUser: null as null | User,
    },
    (set) => {
      return {
        setEditingUser: (user: User | null) => {
          set((state) => ({ ...state, editingUser: user }));
        },
      };
    },
  ),
);
