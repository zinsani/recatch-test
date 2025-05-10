import { useUserStore, type User } from "@/entities/user";
import { useUserTable } from "@/features/user/find";
import { MoreOutlined, FilterFilled } from "@ant-design/icons";
import { Dropdown, Button, Checkbox, Table } from "antd";
import { useCallback } from "react";

function UserTable() {
  const setEditingUser = useUserStore((s) => s.setEditingUser);

  const actionRenderer = useCallback(
    (user: User) => (
      <Dropdown
        trigger={["click"]}
        menu={{
          items: [
            {
              key: "edit",
              label: <a onClick={() => setEditingUser(user)}>수정</a>,
            },
            { type: "divider" },
            {
              key: "delete",
              label: <a>삭제</a>,
            },
          ],
        }}
        overlayStyle={{ width: "181px" }}
      >
        <Button
          icon={<MoreOutlined size={16} />}
          style={{ border: "none", width: "32px" }}
        />
      </Dropdown>
    ),
    [setEditingUser],
  );

  const { columns, filteredUsers, onTableChange } = useUserTable({
    filterIcon: <FilterFilled />,
    actionRenderer: (_, user) => actionRenderer(user),
    checkboxRenderer: (value) => <Checkbox checked={value} />,
  });

  return (
    <Table
      dataSource={filteredUsers}
      rowKey="id"
      columns={columns}
      onChange={onTableChange}
      pagination={false}
    />
  );
}

export default UserTable;
