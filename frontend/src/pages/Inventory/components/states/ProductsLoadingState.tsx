import { Loader } from "lucide-react";

export default function ProductsLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader className="animate-spin w-10 h-10 text-gray-500" />
      <p className="mt-4 text-gray-500">Memuat data produk...</p>
    </div>
  );
}