import type { ProductInput } from '../../../types/product.ts';
import ProductIdParam from '../param/product-id-param.ts';

export class ProductApiError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
    this.name = 'ProductApiError';
  }
}

export type ProductRemoteSource = {
  getProductListRemote: () => Promise<unknown>;
  getProductRemote: (id: ProductIdParam) => Promise<unknown>;
  createProductRemote: (product: ProductInput) => Promise<unknown>;
  updateProductRemote: (
    id: ProductIdParam,
    product: ProductInput
  ) => Promise<unknown>;
  deleteProductRemote: (id: ProductIdParam) => Promise<unknown>;
};

type ProductRemoteOptions = {
  baseUrl?: string;
  fetchImpl?: typeof fetch;
};

export default function ProductRemote({
  baseUrl = '',
  fetchImpl = fetch
}: ProductRemoteOptions = {}): ProductRemoteSource {
  const apiUrl = `${baseUrl.replace(/\/+$/, '')}/api/products`;

  async function request(
    path: string,
    method: string,
    product?: ProductInput
  ): Promise<unknown> {
    const response = await fetchImpl(`${apiUrl}${path}`, {
      method,
      headers: {
        Accept: 'application/json',
        ...(product ? { 'Content-Type': 'application/json' } : {})
      },
      ...(product ? { body: JSON.stringify(product) } : {})
    });
    const payload: unknown = await response.json();

    if (!response.ok) {
      const message =
        typeof payload === 'object' &&
        payload !== null &&
        'message' in payload &&
        typeof payload.message === 'string'
          ? payload.message
          : `Permintaan produk gagal (HTTP ${response.status}).`;

      throw new ProductApiError(message, response.status);
    }

    return payload;
  }

  return {
    getProductListRemote: () => request('', 'GET'),
    getProductRemote: (id) => request(`/${id.toPathSegment()}`, 'GET'),
    createProductRemote: (product) => request('', 'POST', product),
    updateProductRemote: (id, product) =>
      request(`/${id.toPathSegment()}`, 'PUT', product),
    deleteProductRemote: (id) =>
      request(`/${id.toPathSegment()}`, 'DELETE')
  };
}
