import { useEffect, useState } from 'react';
import { Token } from '../types/token';
import { fetchTokens } from '@/services/tokenServices';

const useTokens = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTokens = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchTokens();
        setTokens(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to fetch token data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    getTokens();
  }, []);

  return { tokens, isLoading, error };
};

export default useTokens;