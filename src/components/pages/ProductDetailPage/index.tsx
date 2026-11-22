import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import type { Product } from '../../../types/product.ts';
import productRepository from '../../../data/product/repository/product-repository.ts';
import { ProductApiError } from '../../../data/product/source/product-remote.ts';

const rupiahFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0
});

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [isNotFound, setIsNotFound] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isActive = true;

    async function loadProduct() {
      setIsLoading(true);
      setLoadError('');
      setIsNotFound(false);

      try {
        const productId = Number(id);
        if (!Number.isSafeInteger(productId) || productId <= 0) {
          if (isActive) {
            setIsNotFound(true);
          }
          return;
        }

        const loadedProduct = await productRepository.getProductById(productId);
        if (isActive) {
          setProduct(loadedProduct);
        }
      } catch (error) {
        if (error instanceof ProductApiError && error.status === 404) {
          if (isActive) {
            setIsNotFound(true);
          }
          return;
        }

        console.error('Gagal memuat detail produk:', error);
        if (isActive) {
          setLoadError(
            error instanceof Error
              ? error.message
              : 'Terjadi kesalahan saat memuat detail produk.'
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadProduct();
    return () => {
      isActive = false;
    };
  }, [id, reloadKey]);

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <Link
        className="mb-5 inline-flex min-h-9 items-center justify-center rounded-lg border border-blue-600 bg-white px-3 py-1.5 text-sm font-medium text-blue-700 no-underline transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        to="/products"
      >
        Kembali ke daftar produk
      </Link>

      <section
        className="min-h-[220px] rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        aria-label="Detail produk"
      >
        {isLoading ? (
          <p className="text-slate-500" role="status">
            Memuat detail produk...
          </p>
        ) : isNotFound ? (
          <div
            className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
            role="alert"
          >
            <h1 className="mb-2 text-2xl font-bold text-red-800">
              Produk tidak ditemukan
            </h1>
            <p className="mb-0">Produk dengan ID {id} tidak tersedia.</p>
          </div>
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
        ) : product ? (
          <>
            <p className="mb-2.5 text-xs font-bold tracking-[0.12em] text-blue-600 uppercase">
              Detail Produk
            </p>
            <h1
              id="product-heading"
              className="mb-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            >
              {product.name}
            </h1>
            <p className="text-sm text-slate-500">ID: {product.id}</p>
            <p className="mt-4 text-2xl font-bold text-blue-700">
              {rupiahFormatter.format(product.price)}
            </p>
          </>
        ) : null}
      </section>
    </main>
  );
}

export default ProductDetailPage;
