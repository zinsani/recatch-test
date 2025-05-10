import { Button, Form, Input, DatePicker, Select, Checkbox, Space } from "antd";
import { type User, jobOptions } from "@/entities/user";
import dayjs, { type Dayjs } from "dayjs";
import { requiredMark } from "@/shared/ui";
import { useFormValidation } from "@/shared/lib";

interface Props {
  user: User;
  onClose: () => void;
  onSubmit: (user: User) => void;
}

function UpdateUserForm({ user, onClose, onSubmit }: Props) {
  const { form, isFormValid, handleFieldsChange } = useFormValidation({
    isCreating: false,
  });
  const handleFinish = async (
    values: Omit<Partial<User>, "joinedAt"> & { joinedAt: Dayjs },
  ) => {
    const updated: User = {
      ...user,
      ...values,
      joinedAt: values.joinedAt.format("YYYY-MM-DD"),
    };
    onSubmit(updated);
  };
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
