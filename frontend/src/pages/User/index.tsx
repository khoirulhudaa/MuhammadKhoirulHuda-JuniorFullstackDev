import ComponentCard from "../../components/common/ComponentCard";
import { useUserManagement } from "./hooks/useUserManagement";
import { Forbidden } from "./components/forbidden";

// Modal components
import UserDetailModal from "./components/userDetailModal";
import UserRoleEditModal from "./components/userRoleModal";

// State components
import UsersLoadingState from "./components/states/UsersLoadingState";
import UsersErrorState from "./components/states/UsersErrorState";
import UsersEmptyState from "./components/states/UsersEmptyState";
import UsersTableWrapper from "./components/states/UsersTableWrapper";


export default function UserManagement() {
  const {
    users,
    loading,
    error,
    isAdmin,

    isDetailOpen,
    setIsDetailOpen,
    isEditOpen,
    setIsEditOpen,
    selectedUser,
    editingUser,
    selectedRole,
    setSelectedRole,

    openDetail,
    openEdit,
    handleChangeRole,
  } = useUserManagement();

  if (!isAdmin) {
    return <Forbidden />;
  }

  let cardContent;

  if (loading) {
    cardContent = <UsersLoadingState />;
  } else if (error) {
    cardContent = <UsersErrorState message={error} />;
  } else if (users.length === 0) {
    cardContent = <UsersEmptyState />;
  } else {
    cardContent = (
      <UsersTableWrapper
        users={users}
        onViewDetail={openDetail}
        onEditRole={openEdit}
      />
    );
  }

  return (
    <div className="p-0 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl uppercase font-bold text-gray-800 dark:text-white">
          Manajemen Pengguna
        </h1>
      </div>

      <ComponentCard title="Daftar Pengguna">
        {cardContent}
      </ComponentCard>

      <UserDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        user={selectedUser}
      />

      <UserRoleEditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        user={editingUser}
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
        onSubmit={handleChangeRole}
      />
    </div>
  );
}