import { Space, Button, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import UpdateUserModal from "@/features/user/update/ui/UpdateUserModal";
import { UserTable } from "@/widgets";

function UserPage() {
  return (
    <>
      <Space
        direction="vertical"
        size="middle"
        style={{ display: "flex", padding: "1rem" }}
      >
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "14px",
            paddingRight: "14px",
            height: "48px",
          }}
        >
          <Typography.Title level={5}>회원 목록</Typography.Title>
          <Button type="primary">
            <PlusOutlined />
            추가
          </Button>
        </Space>
        <UserTable />
      </Space>
      <UpdateUserModal />
    </>
  );
}

export default UserPage;
