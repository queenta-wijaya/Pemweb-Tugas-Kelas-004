import { useEffect, useState } from 'react';
import ProductFormModal from './components/ProductFormModal.jsx';
import DeleteProductModal from './components/DeleteProductModal.jsx';
import ProductGrid from './components/organisms/ProductGrid/index.tsx';
import productRepository from './data/product/repository/product-repository.ts';

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    let isActive = true;

    async function loadProducts() {
      setIsLoading(true);
      setLoadError('');

      try {
        const productList = await productRepository.getProductList();

        if (isActive) {
          setProducts(productList);
        }
      } catch (error) {
        console.error('Gagal memuat daftar produk:', error);
        if (isActive) {
          setLoadError(
            'Daftar produk tidak dapat dimuat. Pastikan server API sedang berjalan.'
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();
    return () => {
      isActive = false;
    };
  }, [reloadKey]);

  const normalizedSearch = searchTerm.trim().toLocaleLowerCase('id-ID');
  const filteredProducts = products.filter((product) =>
    product.name.toLocaleLowerCase('id-ID').includes(normalizedSearch)
  );

  async function handleCreateProduct(productInput) {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const newProduct = await productRepository.createProduct(productInput);

      setProducts((currentProducts) =>
        [...currentProducts, newProduct].sort((a, b) => a.id - b.id)
      );
      setSearchTerm('');
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Gagal menambahkan produk:', error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat menambahkan produk.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleUpdateProduct(productId, productInput) {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const updatedProduct = await productRepository.updateProduct(
        productId,
        productInput
      );

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === productId ? updatedProduct : product
        )
      );
      setEditingProduct(null);
    } catch (error) {
      console.error('Gagal memperbarui produk:', error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat memperbarui produk.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteProduct(productId) {
    setIsDeleting(true);
    setDeleteError('');

    try {
      await productRepository.deleteProduct(productId);

      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== productId)
      );
      setDeletingProduct(null);
    } catch (error) {
      console.error('Gagal menghapus produk:', error);
      setDeleteError(
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat menghapus produk.'
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <header className="mb-9">
        <p className="mb-2.5 text-xs font-bold tracking-[0.12em] text-blue-600 uppercase">
          Katalog
        </p>
        <h1 className="mb-2.5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Manajemen Produk
        </h1>
        <p className="text-slate-500">
          Kelola daftar produk dan harga dalam satu tempat.
        </p>
      </header>

      <section
        className="min-h-[220px] rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        aria-labelledby="products-heading"
      >
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
          <div>
            <h2
              id="products-heading"
              className="mb-1.5 text-xl font-semibold text-slate-900"
            >
              Daftar Produk
            </h2>
            <p className="text-sm text-slate-500">
              Kelola daftar produk dan harga dalam satu tempat.
            </p>
          </div>
          <div className="flex w-full items-center justify-between gap-4 sm:w-auto">
            {!isLoading && !loadError && (
              <span className="whitespace-nowrap text-sm text-slate-500">
                {filteredProducts.length} dari {products.length} produk
              </span>
            )}
            <button
              className="inline-flex min-h-10 items-center justify-center rounded-lg border border-blue-700 bg-blue-700 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800 disabled:cursor-wait disabled:opacity-65"
              type="button"
              onClick={() => {
                setSubmitError('');
                setEditingProduct(null);
                setIsAddModalOpen(true);
              }}
            >
              + Tambah Produk
            </button>
          </div>
        </div>

        <label className="sr-only" htmlFor="product-search">
          Cari nama produk
        </label>
        <input
          id="product-search"
          className="mb-5 min-h-11 w-full max-w-sm rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          type="search"
          placeholder="Cari nama produk..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        {isLoading ? (
          <p className="mt-4 text-slate-500" role="status">
            Memuat produk...
          </p>
        ) : loadError ? (
          <div
            className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
            role="alert"
          >
            <p className="mb-3">{loadError}</p>
            <button
              className="inline-flex min-h-9 items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
              type="button"
              onClick={() => setReloadKey((key) => key + 1)}
            >
              Coba lagi
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="mt-4 text-slate-500">
            {products.length === 0
              ? 'Belum ada produk.'
              : 'Produk tidak ditemukan.'}
          </p>
        ) : (
          <ProductGrid
            products={filteredProducts}
            onEdit={(selectedProduct) => {
              setSubmitError('');
              setDeleteError('');
              setIsAddModalOpen(false);
              setDeletingProduct(null);
              setEditingProduct(selectedProduct);
            }}
            onDelete={(selectedProduct) => {
              setDeleteError('');
              setIsAddModalOpen(false);
              setEditingProduct(null);
              setDeletingProduct(selectedProduct);
            }}
          />
        )}
      </section>

      {(isAddModalOpen || editingProduct) && (
        <ProductFormModal
          key={editingProduct ? `edit-${editingProduct.id}` : 'create'}
          product={editingProduct}
          isSubmitting={isSubmitting}
          submitError={submitError}
          onClose={() => {
            if (!isSubmitting) {
              setIsAddModalOpen(false);
              setEditingProduct(null);
            }
          }}
          onSubmit={(productInput) =>
            editingProduct
              ? handleUpdateProduct(editingProduct.id, productInput)
              : handleCreateProduct(productInput)
          }
        />
      )}

      {deletingProduct && (
        <DeleteProductModal
          product={deletingProduct}
          isDeleting={isDeleting}
          deleteError={deleteError}
          onClose={() => {
            if (!isDeleting) {
              setDeletingProduct(null);
            }
          }}
          onConfirm={() => handleDeleteProduct(deletingProduct.id)}
        />
      )}
    </main>
  );
}

export default App;
