import { useState, type FormEvent, type MouseEvent } from 'react';
import type { Product, ProductInput } from '../../../types/product.ts';
import Button from '../../atoms/Button';

type ProductFormModalProps = {
  product: Product | null;
  isSubmitting: boolean;
  submitError: string;
  onClose: () => void;
  onSubmit: (product: ProductInput) => void | Promise<void>;
};

function ProductFormModal({
  product,
  isSubmitting,
  submitError,
  onClose,
  onSubmit
}: ProductFormModalProps) {
  const [name, setName] = useState(product ? product.name : '');
  const [price, setPrice] = useState(product ? String(product.price) : '');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void onSubmit({ name: name.trim(), price: Number(price) });
  }

  function handleBackdropMouseDown(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget && !isSubmitting) {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-10 grid place-items-center bg-slate-900/45 p-5"
      role="presentation"
      onMouseDown={handleBackdropMouseDown}
    >
      <section
        className="max-h-[calc(100dvh-2.5rem)] w-full max-w-[460px] overflow-y-auto rounded-xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-form-title"
      >
        <header className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2
              id="product-form-title"
              className="mb-1 text-xl font-semibold text-slate-900"
            >
              {product ? 'Edit Produk' : 'Tambah Produk'}
            </h2>
            <p className="mb-0 text-sm text-slate-500">
              {product
                ? 'Perbarui informasi produk yang dipilih.'
                : 'Masukkan informasi produk baru.'}
            </p>
          </div>
          <button
            className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-2xl text-slate-500 hover:bg-slate-100 disabled:cursor-wait"
            type="button"
            aria-label="Tutup"
            disabled={isSubmitting}
            onClick={onClose}
          >
            ×
          </button>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 grid gap-2">
            <label
              className="text-sm font-semibold text-slate-700"
              htmlFor="new-product-name"
            >
              Nama Produk
            </label>
            <input
              id="new-product-name"
              className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              type="text"
              placeholder="Contoh: Pulpen"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="mb-4 grid gap-2">
            <label
              className="text-sm font-semibold text-slate-700"
              htmlFor="new-product-price"
            >
              Harga (Rp)
            </label>
            <input
              id="new-product-price"
              className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              type="number"
              placeholder="Contoh: 5000"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              min="0.01"
              step="any"
              required
            />
            <small className="text-xs text-slate-500">
              Harga harus lebih dari 0.
            </small>
          </div>

          {submitError && (
            <p className="mb-4 text-sm text-red-700" role="alert">
              {submitError}
            </p>
          )}

          <div className="mt-6 flex flex-col-reverse justify-end gap-2 sm:flex-row">
            <Button
              variant="secondary"
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="min-h-10 px-3.5"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-h-10 px-3.5 font-semibold"
            >
              {isSubmitting
                ? 'Menyimpan...'
                : product
                  ? 'Simpan Perubahan'
                  : 'Simpan Produk'}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default ProductFormModal;
