import { Modal } from "@/shared/ui";
import UpdateUserForm from "./UpdateUserForm";
import { useUpdateUser } from "..";

function UpdateUserModal() {
  const { editingUser, setEditingUser } = useUpdateUser();

  const isOpen = !!editingUser;

  return (
    <Modal
      open={isOpen}
      title="회원 수정"
      onCancel={() => setEditingUser(null)}
    >
      {isOpen && (
        <UpdateUserForm
          key={editingUser.id}
          user={editingUser}
          onClose={() => setEditingUser(null)}
        />
      )}
    </Modal>
  );
}

export default UpdateUserModal;
