import { Button, Form, Input, DatePicker, Select, Checkbox } from "antd";
import { type User, jobOptions } from "@/entities/user";
import dayjs, { type Dayjs } from "dayjs";
import { requiredMark } from "@/shared/ui";

interface Props {
  user: User;
  onClose: () => void;
  onSubmit: (user: User) => void;
}

function UpdateUserForm({ user, onClose, onSubmit }: Props) {
  const [form] = Form.useForm();
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

  const invalid =
    !form.isFieldsTouched(true) ||
    form.getFieldsError().filter(({ errors }) => errors.length).length > 0;

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleFinish}
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
      <Button type="primary" htmlType="submit" disabled={invalid}>
        수정
      </Button>
    </Form>
  );
}
export default UpdateUserForm;
