import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Product, User } from "../types/product";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5050";

export function useProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Drawer / Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Form states
  const [formName, setFormName] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formStock, setFormStock] = useState("");

  // computed
  const isAdmin = currentUser?.role === "Admin";
  const canSell = isAdmin || currentUser?.role === "Seller";

  // ── Auth check 
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setCurrentUser(JSON.parse(stored));
    }
  }, []);

  // ── Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Anda belum login");

      const res = await fetch(`${API_BASE_URL}/product`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || `HTTP ${res.status}`);
      }

      const data = await res.json();
      if (data.success) {
        setProducts(data.data || []);
      } else {
        throw new Error(data.message || "Gagal memuat produk");
      }
    } catch (err: any) {
      const msg = err.message || "Gagal memuat data produk";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) fetchProducts();
  }, [currentUser]);

  // ── Add product 
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formName.trim() || !formPrice || !formStock) {
      toast.error("Nama, harga, dan stok wajib diisi");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`${API_BASE_URL}/product`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formName.trim(),
          price: parseFloat(formPrice),
          stock: parseInt(formStock, 10),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Gagal menambah produk");
      }

      toast.success("Produk berhasil ditambahkan");
      resetAddForm();
      fetchProducts();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const resetAddForm = () => {
    setIsAddOpen(false);
    setFormName("");
    setFormPrice("");
    setFormStock("");
  };

  // ── Sell product
  const handleSell = async (product: Product, quantity = 1) => {
    // Pengecekan stok di client-side terlebih dahulu
    if (product.stock < quantity) {
        toast.error(
        product.stock === 0
            ? `Stok ${product.name} sudah habis! Tidak bisa menjual.`
            : `Stok ${product.name} tidak cukup! (sisa: ${product.stock}, diminta: ${quantity})`
        );
        return;
    }

    if (!confirm(`Kurangi stok ${product.name} sebanyak ${quantity}?`)) return;

    try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`${API_BASE_URL}/product/${product.id}/sell`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
        throw new Error(data.message || "Gagal menjual produk");
        }

        toast.success(data.message || `Berhasil menjual ${quantity} unit ${product.name}`);
        fetchProducts(); // refresh list
    } catch (err: any) {
        toast.error(err.message || "Terjadi kesalahan saat menjual produk");
    }
  };

  return {
    products,
    loading,
    error,
    currentUser,
    isAdmin,
    canSell,

    isAddOpen,
    setIsAddOpen,
    isDetailOpen,
    setIsDetailOpen,
    selectedProduct,
    setSelectedProduct,

    formName,
    setFormName,
    formPrice,
    setFormPrice,
    formStock,
    setFormStock,

    fetchProducts,
    handleAddProduct,
    handleSell,
    resetAddForm,
  };
}