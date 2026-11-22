function DeleteProductModal({
  product,
  isDeleting,
  deleteError,
  onClose,
  onConfirm
}) {
  return (
    <div
      className="fixed inset-0 z-10 grid place-items-center bg-slate-900/45 p-5"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isDeleting) {
          onClose();
        }
      }}
    >
      <section
        className="w-full max-w-[400px] rounded-xl border border-slate-200 bg-white p-5 text-center shadow-2xl sm:p-6"
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
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              maximumFractionDigits: 0
            }).format(product.price)}
          </span>
        </div>

        {deleteError && (
          <p className="mt-3 text-left text-sm text-red-700" role="alert">
            {deleteError}
          </p>
        )}

        <div className="mt-6 flex flex-col-reverse justify-end gap-2 sm:flex-row">
          <button
            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 disabled:cursor-wait disabled:opacity-65"
            type="button"
            onClick={onClose}
            disabled={isDeleting}
          >
            Batal
          </button>
          <button
            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-red-600 bg-red-600 px-3.5 py-2 text-sm font-semibold text-white hover:border-red-700 hover:bg-red-700 disabled:cursor-wait disabled:opacity-65"
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Menghapus...' : 'Hapus Produk'}
          </button>
        </div>
      </section>
    </div>
  );
}

export default DeleteProductModal;
