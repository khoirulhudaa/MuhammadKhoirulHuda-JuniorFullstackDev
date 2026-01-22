import { X } from "lucide-react";
import { UserRole } from "../types/user";
import Select from "../../../components/form/Select";
import Label from "../../../components/form/Label";

interface UserRoleEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string; role: UserRole } | null;
  selectedRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function UserRoleEditModal({
  isOpen,
  onClose,
  user,
  selectedRole,
  onRoleChange,
  onSubmit,
}: UserRoleEditModalProps) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-[999999] bg-black/60 flex justify-end">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 h-full overflow-y-auto shadow-2xl">
        <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold dark:text-gray-200">
            Ubah Role - {user.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-6">
          <div>
            <Label htmlFor="role">Role Baru</Label>
            <Select 
              options={[
                { value: "Seller", label: "Penjual" },
                { value: "Pelanggan", label: "Pelanggan" },
              ]}
              defaultValue={selectedRole}
              onChange={(v) => onRoleChange(v as UserRole)}
            />
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-800 text-white font-medium rounded-lg transition"
            >
              Simpan Perubahan Role
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-200 dark:bg-white dark:hover:bg-white/80 hover:bg-gray-300 rounded-lg transition"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}