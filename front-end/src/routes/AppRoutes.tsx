import { Routes, Route, Navigate } from 'react-router-dom';
import { DefaultLayout } from 'layouts';
import { ReviewsPage } from 'pages';
import { routes } from './routes';
import React, { lazy, Suspense } from 'react';

const { main, products, reviews } = routes;

const LazyProductsPage = lazy(
  () =>
    import(
      '../pages/Products/Products' /* webpackChunkName: "LazyProductsPage" */
    ),
);

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path={main} element={<DefaultLayout />}>
          <Route index element={<Navigate to={products} />} />
          <Route path={products} element={<LazyProductsPage />} />
          <Route path={reviews} element={<ReviewsPage />} />
          <Route path="*" element={<Navigate to={products} replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
