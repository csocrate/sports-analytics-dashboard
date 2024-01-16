/**
 * ------------------------------------------------------------
 * Sports Analytics Dashboard - App.jsx
 * ------------------------------------------------------------
 */

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import UserDashboard from './pages/UserDashboard';
import Root from './routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'tableau-de-bord',
        element: <UserDashboard />,
      },
    ],
  },
]);

/**
 * This component renders the application.
 *
 * @returns {JSX.Element} RouterProvider component.
 */
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
