import { Link } from 'react-router';

const rupiahFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0
});

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <article className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <span className="text-xs text-slate-500">ID: {product.id}</span>
      <h3 className="mt-2 break-words text-base font-semibold text-slate-900">
        {product.name}
      </h3>
      <p className="mb-0 mt-1 text-lg font-bold text-blue-700">
        {rupiahFormatter.format(product.price)}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          className="inline-flex min-h-9 items-center justify-center rounded-md border border-blue-600 px-3 py-1.5 text-sm font-medium text-blue-700 no-underline transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          to={`/products/${product.id}`}
        >
          Detail
        </Link>
        <button
          className="inline-flex min-h-9 items-center justify-center rounded-md border border-blue-600 px-3 py-1.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          type="button"
          onClick={() => onEdit(product)}
        >
          Edit
        </button>
        <button
          className="inline-flex min-h-9 items-center justify-center rounded-md border border-red-600 bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:border-red-700 hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          type="button"
          onClick={() => onDelete(product)}
        >
          Hapus
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
