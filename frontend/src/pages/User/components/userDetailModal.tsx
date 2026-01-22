
import { X } from "lucide-react";
import { formatDate, roleLabels } from "../utils/userHelpers"; 
import { User } from "../types/user";
import Label from "../../../components/form/Label";

interface UserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export default function UserDetailModal({
  isOpen,
  onClose,
  user,
}: UserDetailModalProps) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-[999999] bg-black/60 flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 h-full border-l border-white/10 overflow-y-auto shadow-2xl">
        <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold dark:text-gray-200">Detail Pengguna</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition"
          >
            <X size={24} className="dark:text-gray-300" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <Label>Nama Lengkap</Label>
            <p className="text-lg font-medium dark:text-gray-200">{user.name}</p>
          </div>

          <div>
            <Label>Email</Label>
            <p className="text-lg dark:text-gray-300">{user.email}</p>
          </div>

          <div>
            <Label>Role</Label>
            <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              {roleLabels[user.role]}
            </span>
          </div>

          <div>
            <Label>Bergabung Pada</Label>
            <p className="text-lg dark:text-gray-300">{formatDate(user.joinDate)}</p>
          </div>

          <div>
            <Label>Status</Label>
            <span
              className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                user.status === "ACTIVE"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
              }`}
            >
              {user.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}