/**
 * ------------------------------------------------------------
 * Sports Analytics Dashboard - routes
 * ------------------------------------------------------------
 */

import { Outlet } from 'react-router-dom';

/**
 * This component renders the root of the application.
 *
 * @component
 * @returns {JSX.Element} Root component.
 */
function Root() {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Root;
