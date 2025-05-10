import { Button, Form, Space } from "antd";
import { type User, UserFormFields } from "@/entities/user";
import dayjs, { type Dayjs } from "dayjs";
import { requiredMark } from "@/shared/ui";
import { useFormValidation } from "@/shared/lib";
import { useEffect } from "react";
import { useUpdateUser } from "../model/useUpdateUser";

interface Props {
  user: User;
  onClose: () => void;
}

function UpdateUserForm({ user, onClose }: Props) {
  const { form, isFormValid, handleFieldsChange } = useFormValidation({
    isCreating: false,
    requiredFields: ["name", "joinedAt"],
  });

  const { update } = useUpdateUser();

  const handleFinish = async (
    values: Omit<Partial<User>, "joinedAt"> & { joinedAt: Dayjs },
  ) => {
    try {
      const updated: User = {
        ...user,
        ...values,
        joinedAt: values.joinedAt.format("YYYY-MM-DD"),
      };
      await update(updated);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!user) {
      form.resetFields();
    }
    return () => form.resetFields();
  }, [form, user]);

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleFinish}
      onFieldsChange={handleFieldsChange}
      initialValues={{
        ...user,
        joinedAt: dayjs(user.joinedAt),
      }}
      requiredMark={requiredMark}
    >
      <UserFormFields />
      <Space
        size="small"
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          type="default"
          htmlType="button"
          style={{ width: "57px" }}
          onClick={handleClose}
        >
          취소
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "57px" }}
          disabled={!isFormValid}
        >
          수정
        </Button>
      </Space>
    </Form>
  );
}
export default UpdateUserForm;
