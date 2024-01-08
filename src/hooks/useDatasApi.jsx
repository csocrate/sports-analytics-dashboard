import axios from 'axios';
import { useEffect, useState } from 'react';

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
