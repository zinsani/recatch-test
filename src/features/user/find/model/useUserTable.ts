import { useState, useMemo, type ReactNode, useEffect } from "react";
import type { User } from "@/entities/user";
import { useUserQuery } from "@/features/user/find";
import { jobOptions } from "@/entities/user";
import type { TableProps } from "antd";
import { getFilteredItems } from "@/shared/lib";

type ColumnFilters = Record<string, string[]>;

export const useUserTable = ({
  filterIcon,
  checkboxRenderer,
  actionRenderer,
}: {
  filterIcon: ReactNode;
  checkboxRenderer: (value: boolean, record: User) => ReactNode;
  actionRenderer: (value: unknown, record: User) => ReactNode;
}) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFilters>({});
  const { data, isLoading } = useUserQuery({ filters: columnFilters });

  const filteredUsers = useMemo(() => {
    return data?.data
      ? getFilteredItems(data.data, { filters: columnFilters })
      : [];
  }, [data?.data, columnFilters]);

  const total = useMemo(() => data?.total ?? 0, [data?.total]);

  const filterProps = {
    filterMode: "menu" as const,
    filterMultiple: true,
    filterIcon,
  };

  const columns: TableProps<User>["columns"] = [
    {
      title: "이름",
      dataIndex: "name",
      width: 120,
      ...filterProps,
      filters:
        filteredUsers.map((e) => ({ text: e.name, value: e.name })) ?? [],
    },
    {
      title: "주소",
      dataIndex: "address",
      width: 249,
      ...filterProps,
      filters:
        filteredUsers
          .filter(({ address }) => !!address)
          .map((e) => ({
            text: e.address!,
            value: e.address!,
          })) ?? [],
    },
    {
      title: "메모",
      dataIndex: "memo",
      width: 249,
      ...filterProps,
      filters:
        filteredUsers
          .filter(({ memo }) => !!memo)
          .map((e) => ({
            text: e.memo!,
            value: e.memo!,
          })) ?? [],
    },
    {
      title: "가입일",
      dataIndex: "joinedAt",
      width: 200,
      ...filterProps,
      filters:
        filteredUsers.map((e) => ({
          text: e.joinedAt,
          value: e.joinedAt,
        })) ?? [],
    },
    {
      title: "직업",
      dataIndex: "job",
      width: 249,
      ...filterProps,
      filters: jobOptions
        .map(({ label, value }) => ({
          text: label,
          value,
        }))
        .filter((e) =>
          filteredUsers.some((x) => x.job?.toString() === e.value),
        ),
    },
    {
      title: "이메일 수신 동의",
      dataIndex: "agreedToEmail",
      width: 150,
      render: checkboxRenderer,
      ...filterProps,
      filters: [
        { text: "동의", value: "true" },
        { text: "비동의", value: "false" },
      ].filter((e) =>
        filteredUsers.some((x) => x.agreedToEmail?.toString() === e.value),
      ),
    },
    {
      title: "",
      key: "actions",
      width: 48,
      render: actionRenderer,
    },
  ];

  const onTableChange: TableProps<User>["onChange"] = (_, filters) => {
    if (!filters) {
      setColumnFilters({});
    } else {
      setColumnFilters(filters as Record<string, string[]>);
    }
  };

  return {
    columns,
    isLoading,
    filteredUsers,
    onTableChange,
    total,
  };
};
