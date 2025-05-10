import { Form, Input, DatePicker, Select, Checkbox } from "antd";
import { jobOptions } from "../model/user-column-options";

function UserFormFields() {
  return (
    <>
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
      <Form.Item
        name="joinedAt"
        label="가입일"
        rules={[{ required: true, message: "가입일은 필수값입니다." }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item name="job" label="직업" style={{ maxWidth: "360px" }}>
        <Select options={jobOptions} />
      </Form.Item>
      <Form.Item name="agreedToEmail" valuePropName="checked">
        <Checkbox>이메일 수신 동의</Checkbox>
      </Form.Item>
    </>
  );
}

export default UserFormFields;
