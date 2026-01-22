import ComponentCard from "../../components/common/ComponentCard";

import { useProductManagement } from "./hooks/useProductManagement";

import ProductAddModal from "./components/ProductAddModal";
import ProductDetailModal from "./components/ProductDetailModal";
import ProductTable from "./components/ProductTable";
import ProductsEmptyState from "./components/states/ProductsEmptyState";
import ProductsErrorState from "./components/states/ProductsErrorState";
import ProductsLoadingState from "./components/states/ProductsLoadingState";

export default function ProductManagement() {
  const {
    products,
    loading,
    error,
    canSell,
    isAddOpen,
    isAdmin,
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

    handleAddProduct,
    handleSell,
  } = useProductManagement();

  if (!products && !loading && !error) {
    return (
      <div className="p-8 text-center text-gray-500">
        Silakan login terlebih dahulu
      </div>
    );
  }

  let content;
  if (loading) {
    content = <ProductsLoadingState />;
  } else if (error) {
    content = <ProductsErrorState message={error} />;
  } else if (products.length === 0) {
    content = <ProductsEmptyState />;
  } else {
    content = (
      <ProductTable
        products={products}
        canSell={canSell}
        isAdmin={isAdmin}                    // ← kirimkan ini
        onViewDetail={(product) => {
          setSelectedProduct(product);
          setIsDetailOpen(true);             // ← ini yang mengontrol modal
        }}
        onSell={handleSell}
        onAddClick={() => setIsAddOpen(true)} // ← callback untuk tombol Tambah
      />
    );
  }

  return (
    <div className="p-0 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center6 mb-6 gap-4">
        <h1 className="text-2xl uppercase font-bold text-gray-800 dark:text-white">
          Manajemen Produk
        </h1>

      </div>

      {error && !loading && (
        <div className="mb-6 p-4 bg-red-100/80 text-red-800 rounded-lg">
          {error}
        </div>
      )}

      <ComponentCard title="Daftar Produk">{content}</ComponentCard>

      <ProductDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        product={selectedProduct}
        canSell={canSell}
        onSell={handleSell}
      />

      <ProductAddModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        formName={formName}
        formPrice={formPrice}
        formStock={formStock}
        onNameChange={setFormName}
        onPriceChange={setFormPrice}
        onStockChange={setFormStock}
        onSubmit={handleAddProduct}
      />
    </div>
  );
}