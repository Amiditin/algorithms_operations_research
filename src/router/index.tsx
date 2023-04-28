import { createBrowserRouter } from 'react-router-dom';

import { Home, MainLayout, NotFound } from '@/pages';
import { MainErrorBoundary } from '@/components';
import { routes } from './routes';

export const router = createBrowserRouter([
  {
    path: routes.root,
    element: <MainLayout />,
    errorElement: <MainErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      { path: routes.notFound, element: <NotFound /> },
    ],
  },
]);
