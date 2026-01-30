
import { useState, useEffect, useCallback } from 'react';
import { fetchSheetData, SheetMarker } from '../services/dataService';

export const useDynamicData = (url: string | null) => {
  const [data, setData] = useState<SheetMarker[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadData = useCallback(async () => {
    if (!url) return;
    setIsLoading(true);
    const result = await fetchSheetData(url);
    if (result) {
      setData(result);
      setLastUpdated(new Date());
      setError(null);
    } else {
      setError('No se pudieron cargar los datos dinámicos');
    }
    setIsLoading(false);
  }, [url]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { data, isLoading, error, lastUpdated, refetch: loadData };
};
