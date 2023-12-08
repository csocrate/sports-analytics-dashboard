import { useEffect, useState } from 'react';

export function useMockedData(ID, DATAS) {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {

    try {
      const data = DATAS.find((data) => data.id === ID || data.userId === ID);

      return setData(data);

    } catch (error) {
      setError(error);
    }

  });
  return { data, error };
}