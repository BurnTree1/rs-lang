import { useState, useEffect } from "react";

export const useFetch = (url: string) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState([]);

  useEffect(() => {
      if (!url) return;
      const fetchData = async () => {
          setStatus('fetching');
          const response = await fetch(url);
          const value = await response.json();
          setData(value);
          setStatus('fetched');
      };

      fetchData();
  }, [url]);

  return { status, data };
};