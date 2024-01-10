import { useEffect, useState } from 'react';

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
