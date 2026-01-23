// components/ProductTable.tsx
import { Eye, Plus } from "lucide-react";
import Button from "../../../components/ui/button/Button";
import { Product } from "../types/product";
import { formatPrice } from "../utils/productHelpers";

type Props = {
  products: Product[];
  canSell: boolean;
  isAdmin: boolean;
  onViewDetail: (p: Product) => void;
  onSell: (p: Product) => void;
  onAddClick: () => void;
};

export default function ProductTable({
  products,
  canSell,
  isAdmin,
  onViewDetail,
  onSell,
  onAddClick,
}: Props) {
  return (
    <div className="overflow-x-auto">
      {isAdmin && (
        <Button
          onClick={onAddClick}
          className="flex items-center gap-2 bg-blue-600 mb-4 hover:bg-blue-700 text-white"
        >
          <Plus className="w-5 h-5" />
          Tambah Produk
        </Button>
      )}

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
            <th className="py-4 px-6 text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Nama Produk
            </th>
            <th className="py-4 px-6 text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Harga
            </th>
            <th className="py-4 px-6 text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Sisa Stok
            </th>
            <th className="py-4 px-6 text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Aksi
            </th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-10 text-gray-500 dark:text-gray-400">
                Belum ada produk
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr
                key={product.id}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="py-4 px-6 font-medium dark:text-white">{product.name}</td>
                <td className="py-4 px-6 dark:text-white">{formatPrice(product.price)}</td>
                <td className="py-4 px-6 dark:text-white">
                  {product.stock > 0 ? (
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      {product.stock}
                    </span>
                  ) : (
                    <span className="text-red-600 dark:text-red-500 font-medium">Habis</span>
                  )}
                </td>
                <td className="py-4 px-6 dark:text-white">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => onViewDetail(product)}
                      title="Lihat detail"
                      className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
                    >
                      <Eye className="w-5 h-5" />
                    </button>

                    {canSell && (
                      <button
                        onClick={() => onSell(product)}
                        className={`text-sm font-medium transition ${
                          product.stock > 0
                            ? "text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                            : "text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 cursor-pointer"
                        }`}
                        title={product.stock === 0 ? "Stok habis – klik untuk melihat pesan" : "Jual 1 unit"}
                      >
                        Jual
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}