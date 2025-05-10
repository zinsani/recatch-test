import { Form } from "antd";
import { useState } from "react";

export const useFormValidation = <T>({
  isCreating,
  requiredFields = [],
}: {
  isCreating: boolean;
  requiredFields: Array<keyof T>;
}) => {
  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(false);

  const handleFieldsChange = () => {
    const hasErrors = form
      .getFieldsError()
      .some((field) => field.errors.length > 0);
    const allTouched = isCreating
      ? form.isFieldsTouched(requiredFields, true)
      : true;

    setIsFormValid(allTouched && !hasErrors);
  };

  return { form, isFormValid, handleFieldsChange };
};
