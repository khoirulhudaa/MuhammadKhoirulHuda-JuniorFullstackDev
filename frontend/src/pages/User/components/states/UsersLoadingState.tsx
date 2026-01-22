import { Loader } from "lucide-react";

export default function UsersLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader className="animate-spin w-10 h-10 text-gray-500 mb-4" />
      <p className="text-gray-600 dark:text-gray-400">Memuat data pengguna...</p>
    </div>
  );
}