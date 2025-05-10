import { Modal } from "@/shared/ui";
import UpdateUserForm from "./UpdateUserForm";
import { useUpdateUser } from "..";
import type { User } from "@/entities/user";

function UpdateUserModal() {
  const { editingUser, setEditingUser, update } = useUpdateUser();

  const handleSubmit = async (user: User) => {
    try {
      await update(user);

      setEditingUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      open={!!editingUser}
      title="사용자 수정"
      onCancel={() => setEditingUser(null)}
    >
      {editingUser && (
        <UpdateUserForm
          key={editingUser.id}
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSubmit={handleSubmit}
        />
      )}
    </Modal>
  );
}

export default UpdateUserModal;
