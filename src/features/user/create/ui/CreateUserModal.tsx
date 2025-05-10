import { Modal } from "@/shared/ui";
import { CreateUserForm, useCreateUser } from "..";

function CreateUserModal() {
  const { isModalOpen, setModalOpen } = useCreateUser();
  return (
    <Modal
      open={isModalOpen}
      title="회원 수정"
      onCancel={() => setModalOpen(false)}
    >
      <CreateUserForm onClose={() => setModalOpen(false)} />
    </Modal>
  );
}

export default CreateUserModal;
