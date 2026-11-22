import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';

function NotFoundPage() {
  return (
    <main className="page">
      <section className="product-section">
        <p className="eyebrow">404</p>
        <h1>Halaman tidak ditemukan</h1>
        <p className="page-description">
          URL yang Anda buka tidak tersedia.
        </p>
        <Link className="primary-button" to="/">
          Kembali ke daftar produk
        </Link>
      </section>
    </main>
  );
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
