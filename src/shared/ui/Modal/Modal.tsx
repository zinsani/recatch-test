import { Modal as AntdModal } from "antd";
import { type ReactNode } from "react";

interface ModalProps {
  open: boolean;
  title: string;
  onCancel: () => void;
  children: ReactNode;
}

function Modal({ open, title, onCancel, children }: ModalProps) {
  return (
    <AntdModal open={open} title={title} onCancel={onCancel} footer={null}>
      {children}
    </AntdModal>
  );
}
export default Modal;
