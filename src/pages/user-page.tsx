import type { User } from "@/entities/user";
import {
  agreedToEmailOptions,
  jobOptions,
} from "@/entities/user/model/user-column-options";
import { useUserQuery } from "@/features/user/find/useUserQuery";
import { Space, Input, Select, Table, Button } from "antd";
import { FilterFilled, MoreOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";

type ColumnFilters = Record<string, string[]>;

function UserPage() {
  const { data } = useUserQuery({});
  const [columnFilters, setColumnFilters] = useState<ColumnFilters>({});

  const filteredUsers = useMemo(() => {
    return (
      data?.data.filter((user) => {
        const matchesColumnFilters = Object.entries(columnFilters).every(
          ([field, values]) => {
            if (!values || values.length === 0) return true;
            const userValue = String(user[field as keyof User]);
            return values.includes(userValue);
          },
        );

        return matchesColumnFilters;
      }) || []
    );
  }, [data?.data, columnFilters]);

  const filterProps = {
    filterMode: "menu" as const,
    filterMultiple: true,
    filterIcon: <FilterFilled />,
  };

  return (
    <>
      <Space
        direction="vertical"
        size="middle"
        style={{ display: "flex", padding: "1rem" }}
      >
        <Space wrap>
          <Input placeholder="이름, 주소, 메모 검색" />
          <Select placeholder="직업 선택" allowClear options={jobOptions} />
          <Select
            placeholder="이메일 수신 동의"
            allowClear
            options={agreedToEmailOptions}
          />
        </Space>

        <Table
          dataSource={filteredUsers}
          rowKey="id"
          columns={[
            {
              title: "이름",
              dataIndex: "name",
              ...filterProps,
              filters:
                data?.data.map((e) => ({ text: e.name, value: e.name })) ?? [],
            },
            {
              title: "주소",
              dataIndex: "address",
              ...filterProps,
              filters:
                data?.data
                  .filter(({ address }) => !!address)
                  .map((e) => ({
                    text: e.address!,
                    value: e.address!,
                  })) ?? [],
            },
            {
              title: "메모",
              dataIndex: "memo",
              ...filterProps,
              filters:
                data?.data
                  .filter(({ memo }) => !!memo)
                  .map((e) => ({
                    text: e.memo!,
                    value: e.memo!,
                  })) ?? [],
            },
            {
              title: "가입일",
              dataIndex: "joinedAt",
              ...filterProps,
              filters:
                data?.data.map((e) => ({
                  text: e.joinedAt,
                  value: e.joinedAt,
                })) ?? [],
            },
            {
              title: "직업",
              dataIndex: "job",
              ...filterProps,
              filters: jobOptions.map(({ label, value }) => ({
                text: label,
                value,
              })),
            },
            {
              title: "이메일 수신 동의",
              dataIndex: "agreedToEmail",
              ...filterProps,
              filters: [
                { text: "동의", value: true },
                { text: "비동의", value: false },
              ],
            },
            {
              title: "",
              key: "actions",
              render: (_, user) => <Button icon={<MoreOutlined />} />,
            },
          ]}
          onChange={(_, filters) => {
            // filters: { name: ['홍길동', '김철수'], address: ['서울시'] ... }
            setColumnFilters(filters as Record<string, string[]>);
          }}
        />
      </Space>
    </>
  );
}

export default UserPage;
