import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const rupiahFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0
});

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
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
        const response = await fetch(`/products/${id}`);
        if (response.status === 404) {
          if (isActive) {
            setIsNotFound(true);
          }
          return;
        }

        const result = await response.json();
        if (!response.ok || result.status !== 'success' || !result.data) {
          throw new Error(result.message || 'Detail produk gagal dimuat.');
        }

        if (isActive) {
          setProduct(result.data);
        }
      } catch (error) {
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
    <main className="page">
      <Link className="outline-button" to="/">
        Kembali ke daftar produk
      </Link>

      <section className="product-section" aria-label="Detail produk">
        {isLoading ? (
          <p className="list-message" role="status">
            Memuat detail produk...
          </p>
        ) : isNotFound ? (
          <div className="error-message" role="alert">
            <h1>Produk tidak ditemukan</h1>
            <p>Produk dengan ID {id} tidak tersedia.</p>
          </div>
        ) : loadError ? (
          <div className="error-message" role="alert">
            <p>{loadError}</p>
            <button
              className="secondary-button"
              type="button"
              onClick={() => setReloadKey((key) => key + 1)}
            >
              Coba lagi
            </button>
          </div>
        ) : product ? (
          <>
            <p className="eyebrow">Detail Produk</p>
            <h1 id="product-heading">{product.name}</h1>
            <p className="product-id">ID: {product.id}</p>
            <p className="product-price">
              {rupiahFormatter.format(product.price)}
            </p>
          </>
        ) : null}
      </section>
    </main>
  );
}

export default ProductDetailPage;
