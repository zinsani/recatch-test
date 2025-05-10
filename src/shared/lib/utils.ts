import type { BaseQueryParams } from "../api";

export const getFilteredItems = <T, Q extends BaseQueryParams<T>>(
  data: T[],
  params: Q,
) => {
  return params.filters
    ? data.filter((item) => {
        const matchesColumnFilters = Object.entries(params.filters!).every(
          ([field, values]) => {
            if (!values || values.length === 0) return true;
            const userValue = String(item[field as keyof T]);
            console.log("filter", { userValue, values });
            return values.includes(userValue);
          },
        );

        return matchesColumnFilters;
      })
    : data;
};
