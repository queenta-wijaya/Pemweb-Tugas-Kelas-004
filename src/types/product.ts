export interface Product {
  id: number;
  name: string;
  price: number;
}

export type ProductInput = Pick<Product, 'name' | 'price'>;
