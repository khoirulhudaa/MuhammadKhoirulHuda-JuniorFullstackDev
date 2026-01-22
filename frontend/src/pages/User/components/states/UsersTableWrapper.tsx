import UsersTable from "../userTable"; 

interface UsersTableWrapperProps {
  users: any[]; 
  onViewDetail: (user: any) => void;
  onEditRole: (user: any) => void;
}

export default function UsersTableWrapper({
  users,
  onViewDetail,
  onEditRole,
}: UsersTableWrapperProps) {
  return (
    <UsersTable 
      users={users} 
      onViewDetail={onViewDetail} 
      onEditRole={onEditRole} 
    />
  );
}