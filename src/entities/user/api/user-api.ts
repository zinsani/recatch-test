import type { BaseQueryParams } from "@/shared/api";
import { userApiLocalStorage } from "./user-api-local-storage";
import type { User } from "../model/user.types";

export type QueryParams = {
  filters?: Record<string, string[]>;
} & BaseQueryParams<User>;

// TODO: replace below with remote api service
export const userApi = userApiLocalStorage;
