import type { User } from "@/entities/user";
import {
  agreedToEmailOptions,
  jobOptions,
} from "@/entities/user/model/user-column-options";
import { useUserQuery } from "@/features/user/find/useUserQuery";
import { Space, Input, Select, Table, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";

function UserPage() {
  const { data } = useUserQuery({});
  const filteredItems = data ? data.data : ([] as User[]);

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
          dataSource={filteredItems}
          rowKey="id"
          columns={[
            {
              title: "이름",
              dataIndex: "name",
            },
            {
              title: "주소",
              dataIndex: "address",
            },
            {
              title: "메모",
              dataIndex: "memo",
            },
            {
              title: "가입일",
              dataIndex: "joinedAt",
            },
            {
              title: "직업",
              dataIndex: "job",
            },
            {
              title: "",
              key: "actions",
              render: (_, user) => <Button icon={<MoreOutlined />} />,
            },
          ]}
        />
      </Space>
    </>
  );
}

export default UserPage;
