import type { Product } from '../../../types/product.ts';

export default class ProductModel {
  private constructor(private readonly product: Product) {}

  getId(): number {
    return this.product.id;
  }

  toJSON(): Product {
    return { ...this.product };
  }

  static fromResponse(data: unknown): ProductModel {
    if (typeof data !== 'object' || data === null) {
      throw new TypeError('Format produk dari API tidak valid.');
    }

    const record = data as Record<string, unknown>;
    if (
      typeof record.id !== 'number' ||
      !Number.isSafeInteger(record.id) ||
      record.id <= 0 ||
      typeof record.name !== 'string' ||
      record.name.trim().length === 0 ||
      typeof record.price !== 'number' ||
      !Number.isFinite(record.price) ||
      record.price <= 0
    ) {
      throw new TypeError('Format produk dari API tidak valid.');
    }

    return new ProductModel({
      id: record.id,
      name: record.name.trim(),
      price: record.price
    });
  }
}
