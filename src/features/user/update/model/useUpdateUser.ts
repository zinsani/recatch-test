import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "@/entities/user";
import { userApi } from "@/entities/user";
import { config } from "@/shared/config";
import { useUserStore } from "@/entities/user";

export const useUpdateUser = () => {
  const editingUser = useUserStore((s) => s.editingUser);
  const setEditingUser = useUserStore((s) => s.setEditingUser);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (user: User) => userApi.update(user),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [config.queryKeys.users] }),
  });

  return {
    editingUser,
    setEditingUser,
    update: (user: User) => mutation.mutateAsync(user),
  };
};
