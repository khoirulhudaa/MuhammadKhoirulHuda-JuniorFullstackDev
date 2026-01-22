import { Edit, Eye } from "lucide-react";
import { User } from "../types/user";
import { roleLabels } from "../utils/userHelpers";

interface UsersTableProps {
  users: User[];
  onViewDetail: (user: User) => void;
  onEditRole: (user: User) => void;
}

export default function UsersTable({
  users,
  onViewDetail,
  onEditRole,
}: UsersTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
            <th className="py-4 px-6 uppercase text-xs font-medium text-gray-700 dark:text-gray-300">
              Nama
            </th>
            <th className="py-4 px-6 uppercase text-xs font-medium text-gray-700 dark:text-gray-300">
              Email
            </th>
            <th className="py-4 px-6 uppercase text-xs font-medium text-gray-700 dark:text-gray-300">
              Role
            </th>
            <th className="py-4 px-6 uppercase text-xs font-medium text-gray-700 dark:text-gray-300">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <td className="py-4 px-6 font-medium dark:text-gray-200">{user.name}</td>
              <td className="py-4 px-6 dark:text-gray-300">{user.email}</td>
              <td className="py-4 px-6">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  {roleLabels[user.role]}
                </span>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => onViewDetail(user)}
                    title="Lihat Detail"
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
                  >
                    <Eye size={20} className="text-black dark:text-white hover:text-gray-700" />
                  </button>

                  <button
                    onClick={() => onEditRole(user)}
                    title={user.role === "Admin" ? "Admin tidak dapat diubah" : "Ubah Role"}
                    disabled={user.role === "Admin"}
                    className={`p-2 rounded transition group relative ${
                      user.role === "Admin"
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-blue-100 dark:hover:bg-white/20"
                    }`}
                  >
                    <Edit
                      size={20}
                      className={`${
                        user.role === "Admin" ? "dark:text-white text-gray-400" : "dark:text-white dark:hover:text-white/80 text-blue-600 hover:text-blue-800"
                      }`}
                    />

                    {user.role === "Admin" && (
                      <span className="absolute dark:bg-white bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 dark:text-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                        Admin tidak dapat diubah
                      </span>
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}