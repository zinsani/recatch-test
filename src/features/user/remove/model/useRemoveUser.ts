import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/entities/user";
import { config } from "@/shared/config";

export const useRemoveUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => userApi.remove(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [config.queryKeys.users] }),
  });
  return {
    remove: (id: string) => mutation.mutateAsync(id),
  };
};
