import { Button, Form, Space } from "antd";
import { UserFormFields, type User } from "@/entities/user";
import { useFormValidation } from "@/shared/lib";
import { useCreateUser } from "../model/useCreateUser";
import { useEffect } from "react";

interface Props {
  onClose: () => void;
}

function CreateUserForm({ onClose }: Props) {
  const { form, isFormValid, handleFieldsChange } = useFormValidation<User>({
    isCreating: true,
    requiredFields: ["name", "joinedAt"],
  });

  const { isModalOpen, create } = useCreateUser();

  const handleFinish = async (values: any) => {
    try {
      const user: Omit<User, "id"> = {
        ...values,
        joinedAt: values.joinedAt.format("YYYY-MM-DD"),
      };
      await create(user);
      form.resetFields();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isModalOpen) {
      form.resetFields();
    }
  }, [form, isModalOpen]);

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleFinish}
      onFieldsChange={handleFieldsChange}
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
          onClick={onClose}
        >
          취소
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "57px" }}
          disabled={!isFormValid}
        >
          추가
        </Button>
      </Space>
    </Form>
  );
}
export default CreateUserForm;
