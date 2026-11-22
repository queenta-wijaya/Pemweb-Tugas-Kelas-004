import { Outlet } from 'react-router';

function PageLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Outlet />
    </div>
  );
}

export default PageLayout;
