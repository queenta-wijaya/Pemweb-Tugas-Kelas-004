import type { MouseEvent } from 'react';
import type { Product } from '../../../types/product.ts';
import Button from '../../atoms/Button';

type DeleteProductModalProps = {
  product: Product;
  isDeleting: boolean;
  deleteError: string;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
};

const rupiahFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0
});

function DeleteProductModal({
  product,
  isDeleting,
  deleteError,
  onClose,
  onConfirm
}: DeleteProductModalProps) {
  function handleBackdropMouseDown(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget && !isDeleting) {
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
        className="max-h-[calc(100dvh-2.5rem)] w-full max-w-[400px] overflow-y-auto rounded-xl border border-slate-200 bg-white p-5 text-center shadow-2xl sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-product-title"
      >
        <div
          className="mx-auto mb-4 grid size-11 place-items-center rounded-full bg-red-50 text-xl font-bold text-red-600"
          aria-hidden="true"
        >
          !
        </div>
        <h2
          id="delete-product-title"
          className="mb-2 text-xl font-semibold text-slate-900"
        >
          Hapus Produk?
        </h2>
        <p className="mb-4 text-sm text-slate-500">
          Produk yang dihapus tidak dapat dikembalikan.
        </p>

        <div className="grid gap-1 rounded-lg border border-slate-200 p-3.5 text-left">
          <strong>{product.name}</strong>
          <span className="font-bold text-blue-700">
            {rupiahFormatter.format(product.price)}
          </span>
        </div>

        {deleteError && (
          <p className="mt-3 text-left text-sm text-red-700" role="alert">
            {deleteError}
          </p>
        )}

        <div className="mt-6 flex flex-col-reverse justify-end gap-2 sm:flex-row">
          <Button
            variant="secondary"
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="min-h-10 px-3.5"
          >
            Batal
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="min-h-10 px-3.5 font-semibold"
          >
            {isDeleting ? 'Menghapus...' : 'Hapus Produk'}
          </Button>
        </div>
      </section>
    </div>
  );
}

export default DeleteProductModal;
