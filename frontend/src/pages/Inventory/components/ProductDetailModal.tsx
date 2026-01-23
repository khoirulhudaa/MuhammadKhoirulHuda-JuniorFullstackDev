import { X } from "lucide-react";
import Label from "../../../components/form/Label";
import { Product } from "../types/product";
import { formatDate, formatPrice } from "../utils/productHelpers";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  canSell: boolean;
  onSell: (p: Product) => void;
};

export default function ProductDetailModal({
  isOpen,
  onClose,
  product,
}: Props) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl max-w-lg w-full p-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Detail Produk</h2>

        <div className="space-y-5">
          <div>
            <Label>Nama</Label>
            <p className="text-lg font-medium mt-1">{product.name}</p>
          </div>
          <div>
            <Label>Harga</Label>
            <p className="text-lg mt-1">{formatPrice(product.price)}</p>
          </div>
          <div>
            <Label>Stok Saat Ini</Label>
            <p className="text-lg mt-1">
              {product.stock > 0 ? product.stock : "Stok habis"}
            </p>
          </div>
          <div>
            <Label>Ditambahkan pada</Label>
            <p className="text-lg mt-1">{formatDate(product.created_at)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}