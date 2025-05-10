export type CreateResponse<T> = {
  data: T;
};
export type FindOneResponse<T> = {
  data: T;
};
export type FindManyResponse<T> = {
  total: number;
  data: T[];
};
export type UpdatereateResponse<T> = {
  data: T;
};
export type RemoveResponse<K> = {
  id: K;
};

export type SortOrder = "ascend" | "descend" | undefined;
export type BaseQueryParams<T> = {
  search?: string;
  pageSize?: number;
  page?: number;
  sortField?: keyof T;
  sortOrder?: SortOrder;
  filters?: Record<string, string[]>;
};
export interface BaseApi<T extends { id: T["id"] }> {
  create(data: Omit<T, "id">): Promise<CreateResponse<T>>;
  findOne(id: T["id"]): Promise<FindOneResponse<T>>;
  findMany(
    params: BaseQueryParams<T> & Partial<Record<keyof T, T[keyof T]>>,
  ): Promise<FindManyResponse<T>>;
  update(data: T): Promise<FindOneResponse<T>>;
  remove(id: T["id"]): Promise<RemoveResponse<T["id"]>>;
}
