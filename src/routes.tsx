import {
  createHashRouter,
  RouterProvider,
} from 'react-router-dom'
import LandingPage from '@/components/landing-page'

const router = createHashRouter([
  {
    path: "/",
    element: <LandingPage />,
    children: [],
  },
]);

export default router
