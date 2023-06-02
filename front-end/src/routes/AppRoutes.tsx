import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DefaultLayout } from 'layouts';
import { routes } from './routes';

const { main, products, reviews } = routes;

const LazyProductsPage = lazy(
  () =>
    import(
      '../pages/Products/Products' /* webpackChunkName: "LazyProductsPage" */
    ),
);

const LazyReviewsPage = lazy(
  () =>
    import(
      '../pages/Reviews/Reviews' /* webpackChunkName: "LazyReviewsPage" */
    ),
);

const LazyReviewItemPage = lazy(
  () =>
    import(
      '../pages/ReviewItemPage/ReviewItemPage' /* webpackChunkName: "LazyReviewItemPage" */
    ),
);

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path={main} element={<DefaultLayout />}>
          <Route index element={<Navigate to={products} />} />
          <Route path={products} element={<LazyProductsPage />} />
          <Route path={reviews} element={<LazyReviewsPage />} />
          <Route path={`${reviews}/:id`} element={<LazyReviewItemPage />} />
          <Route path="*" element={<Navigate to={products} replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
