import { Space, Table, Button, Checkbox } from "antd";
import { FilterFilled, MoreOutlined } from "@ant-design/icons";
import { useUserTable } from "@/features/user/find/useUserTable";

function UserPage() {
  const { columns, filteredUsers, onTableChange } = useUserTable({
    filterIcon: <FilterFilled />,
    actionRenderer: (_, user) => <Button icon={<MoreOutlined />} />,
    checkboxRenderer: (value) => <Checkbox checked={value} />,
  });

  return (
    <>
      <Space
        direction="vertical"
        size="middle"
        style={{ display: "flex", padding: "1rem" }}
      >
        <Table
          dataSource={filteredUsers}
          rowKey="id"
          columns={columns}
          onChange={onTableChange}
        />
      </Space>
    </>
  );
}

export default UserPage;
