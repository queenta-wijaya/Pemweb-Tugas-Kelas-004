import type { Product } from '../../../types/product.ts';
import ProductCard from '../../molecules/ProductCard';
import styles from './styles.module.css';

type ProductGridProps = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

function ProductGrid({ products, onEdit, onDelete }: ProductGridProps) {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ProductGrid;
