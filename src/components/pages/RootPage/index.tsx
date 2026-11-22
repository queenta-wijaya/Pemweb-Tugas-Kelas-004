import { Navigate } from 'react-router';

function RootPage() {
  return <Navigate replace to="/products" />;
}

export default RootPage;
