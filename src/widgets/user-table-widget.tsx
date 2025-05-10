import { type User } from "@/entities/user";
import { useUserTable } from "@/features/user/find";
import { useRemoveUser } from "@/features/user/remove";
import { useUpdateUser } from "@/features/user/update";
import { MoreOutlined, FilterFilled } from "@ant-design/icons";
import { Dropdown, Button, Checkbox, Table, Popconfirm } from "antd";
import { useCallback } from "react";

function UserTable() {
  const { setEditingUser } = useUpdateUser();
  const { remove } = useRemoveUser();
  const handleRemove = async (id: User["id"]) => {
    try {
      await remove(id);
    } catch (error) {
      console.error(error);
    }
  };

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
              label: (
                <Popconfirm
                  title="정말 삭제하시겠습니까?"
                  onConfirm={() => handleRemove(user.id)}
                >
                  <a>삭제</a>
                </Popconfirm>
              ),
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
