import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="mb-2.5 text-xs font-bold tracking-[0.12em] text-blue-600 uppercase">
          404
        </p>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Halaman tidak ditemukan
        </h1>
        <p className="text-slate-500">URL yang Anda buka tidak tersedia.</p>
        <Link
          className="mt-5 inline-flex min-h-10 items-center justify-center rounded-lg border border-blue-700 bg-blue-700 px-3.5 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          to="/products"
        >
          Kembali ke daftar produk
        </Link>
      </section>
    </main>
  );
}

export default NotFoundPage;
