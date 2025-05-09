import type { BaseQueryParams } from "@/shared/api";
import { userApiLocalStorage } from "./user-api-local-storage";
import type { User } from "../model/user.types";

export type QueryParams = {
  job?: string;
  agreed?: boolean;
} & BaseQueryParams<User>;

// TODO: replace below with remote api service
export const userApi = userApiLocalStorage;
