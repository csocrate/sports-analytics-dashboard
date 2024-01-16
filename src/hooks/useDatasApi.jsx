/**
 * ------------------------------------------------------------
 * Sports Analytics Dashboard - hooks/useDatasApi.jsx
 * ------------------------------------------------------------
 */

import axios from 'axios';
import { useEffect, useState } from 'react';

/**
 * A custom hook to retrieves data from API.
 *
 * @param {string} URI - user URI.
 * @returns {Object} data - Data from API.
 */
export function useDatasApi(URI) {
  const [data, setData] = useState(null),
    URL = `http://localhost:3000/${URI}`;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(URL);
        return setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (URI) {
      fetchUserData();
    }
  }, [URI, URL]);
  return data;
}
