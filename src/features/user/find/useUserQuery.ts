import { userApi, type QueryParams } from "@/entities/user";
import { config } from "@/shared/config";
import { useQuery } from "@tanstack/react-query";

export const useUserQuery = (params: QueryParams) => {
  return useQuery({
    queryKey: [config.queryKeys.users, params],
    queryFn: () => userApi.findMany(params),
  });
};
