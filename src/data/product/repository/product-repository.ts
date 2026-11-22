import type { Product, ProductInput } from '../../../types/product.ts';
import ProductModel from '../model/product-model.ts';
import ProductIdParam from '../param/product-id-param.ts';
import ProductRemote, { type ProductRemoteSource } from '../source/product-remote.ts';

function getResponseData(response: unknown): unknown {
  if (
    typeof response !== 'object' ||
    response === null ||
    !('status' in response) ||
    response.status !== 'success' ||
    !('data' in response)
  ) {
    const message =
      typeof response === 'object' &&
      response !== null &&
      'message' in response &&
      typeof response.message === 'string'
        ? response.message
        : 'Format respons API produk tidak valid.';

    throw new TypeError(message);
  }

  return response.data;
}

function parseProduct(response: unknown): Product {
  return ProductModel.fromResponse(getResponseData(response)).toJSON();
}

export function ProductRepository(source: ProductRemoteSource) {
  async function getProductList(): Promise<Product[]> {
    const data = getResponseData(await source.getProductListRemote());
    if (!Array.isArray(data)) {
      throw new TypeError('Respons daftar produk harus berupa array.');
    }

    const products = data.map((item) =>
      ProductModel.fromResponse(item).toJSON()
    );
    const ids = products.map((product) => product.id);
    if (new Set(ids).size !== ids.length) {
      throw new TypeError('ID produk dari API harus unik.');
    }

    return products;
  }

  async function getProductById(id: number): Promise<Product> {
    return parseProduct(await source.getProductRemote(new ProductIdParam(id)));
  }

  async function createProduct(product: ProductInput): Promise<Product> {
    return parseProduct(await source.createProductRemote(product));
  }

  async function updateProduct(
    id: number,
    product: ProductInput
  ): Promise<Product> {
    return parseProduct(
      await source.updateProductRemote(new ProductIdParam(id), product)
    );
  }

  async function deleteProduct(id: number): Promise<Product> {
    return parseProduct(
      await source.deleteProductRemote(new ProductIdParam(id))
    );
  }

  return {
    getProductList,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
  };
}

const productRepository = ProductRepository(ProductRemote());
export default productRepository;
