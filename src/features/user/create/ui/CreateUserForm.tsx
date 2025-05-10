import { Button, Form, Input, DatePicker, Select, Checkbox, Space } from "antd";
import { jobOptions, type User } from "@/entities/user";
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
      <Form.Item
        name="name"
        label="이름"
        rules={[{ required: true, message: "이름 값은 필수입니다." }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="address"
        label="주소"
        rules={[{ max: 20, message: "글자수 20을 초과할 수 없습니다." }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="memo"
        label="메모"
        rules={[{ max: 50, message: "글자수 50을 초과할 수 없습니다." }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="joinedAt" label="가입일" rules={[{ required: true }]}>
        <DatePicker />
      </Form.Item>
      <Form.Item name="job" label="직업">
        <Select options={jobOptions} />
      </Form.Item>
      <Form.Item name="agreedToEmail" valuePropName="checked">
        <Checkbox>이메일 수신 동의</Checkbox>
      </Form.Item>
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
