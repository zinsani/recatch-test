import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore, type User } from "@/entities/user";
import { userApi } from "@/entities/user";
import { config } from "@/shared/config";

export const useCreateUser = () => {
  const isModalOpen = useUserStore((s) => s.isCreatingModalOpened);
  const setModalOpen = useUserStore((s) => s.setCreatingModalOpened);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (user: Omit<User, "id">) => userApi.create(user),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [config.queryKeys.users] }),
  });

  return {
    isModalOpen,
    setModalOpen,
    create: (user: Omit<User, "id">) => mutation.mutateAsync(user),
  };
};
