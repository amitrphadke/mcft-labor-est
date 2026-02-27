import { useState } from 'react';
import Papa from 'papaparse';

export function useCsvParser() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const parse = (file: File) => {
    setLoading(true);
    setError(null);
    setData([]);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setData(results.data);
        setLoading(false);
      },
      error: (err) => {
        setError(err.message);
        setLoading(false);
      },
    });
  };

  return { data, error, loading, parse };
}
