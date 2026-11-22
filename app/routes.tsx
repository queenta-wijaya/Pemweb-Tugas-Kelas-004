import { Route, Routes } from 'react-router';
import PageLayout from '../src/components/templates/PageLayout';
import NotFoundPage from '../src/components/pages/NotFoundPage';
import ProductDetailPage from '../src/components/pages/ProductDetailPage';
import RootPage from './page';
import ProductsPage from './products/page';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route index element={<RootPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
