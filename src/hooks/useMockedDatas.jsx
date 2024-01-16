/**
 * ------------------------------------------------------------
 * Sports Analytics Dashboard - hooks/useMockedDatas.jsx
 * ------------------------------------------------------------
 */

import { useEffect, useState } from 'react';

/**
 * A custom hook to retrieves user mocked data.
 *
 * @param {number} ID - user ID.
 * @param {Array} DATAS - Data from mocked data.
 * @returns {Object}
 *  @property {Object} data - Data for custom hook
 *  @property {Error|null} error - Error or null
 */
export function useMockedDatas(ID, DATAS) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const userData = DATAS.find((data) =>
        data.id ? data.id === ID : data.userId === ID,
      );

      return setData(userData);
    } catch (error) {
      setError(error);
    }
  }, [ID, DATAS]);
  return { data, error };
}
