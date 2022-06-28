import { Navigate, useRoutes } from 'react-router-dom';
import GetProductList from './features/product/views/products_list';
import GetProductListDetailsPage from './features/product/views/product_detail_page';
import NotFound from './pages/Page404';

export default function AppRoutes() {
  return useRoutes([
    {
      path: '/',
      children: [
        { path: '/purchase/detailsOfProduct', element: <GetProductList /> },
        { path: '/purchase/getAllProducts', element: <GetProductListDetailsPage /> },
        { path: '/purchase/create', element: <GetProductList /> },

        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
  
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
