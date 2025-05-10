import { Form } from "antd";
import { useState } from "react";

export const useFormValidation = ({ isCreating }: { isCreating: boolean }) => {
  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(false);

  const handleFieldsChange = () => {
    const hasErrors = form
      .getFieldsError()
      .some((field) => field.errors.length > 0);
    const allTouched = isCreating ? form.isFieldsTouched(true) : true;
    setIsFormValid(allTouched && !hasErrors);
  };

  return { form, isFormValid, handleFieldsChange };
};
