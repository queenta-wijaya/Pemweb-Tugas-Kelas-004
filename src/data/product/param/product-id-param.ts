export default class ProductIdParam {
  constructor(private readonly id: number) {
    if (!Number.isSafeInteger(id) || id <= 0) {
      throw new RangeError('ID produk harus berupa bilangan bulat positif.');
    }
  }

  toPathSegment(): string {
    return String(this.id);
  }
}
