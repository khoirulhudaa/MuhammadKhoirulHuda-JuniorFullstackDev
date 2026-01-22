import { X } from "lucide-react";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  formName: string;
  formPrice: string;
  formStock: string;
  onNameChange: (v: string) => void;
  onPriceChange: (v: string) => void;
  onStockChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function ProductAddModal({
  isOpen,
  onClose,
  formName,
  formPrice,
  formStock,
  onNameChange,
  onPriceChange,
  onStockChange,
  onSubmit,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Tambah Produk Baru</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <Label>Nama Produk</Label>
            <Input
              value={formName}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Contoh: Beras Premium"
              required
            />
          </div>

          <div>
            <Label>Harga (Rp)</Label>
            <Input
              type="number"
              min="0"
              value={formPrice}
              onChange={(e) => onPriceChange(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Stok Awal</Label>
            <Input
              type="number"
              min="0"
              value={formStock}
              onChange={(e) => onStockChange(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Simpan
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Batal
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}