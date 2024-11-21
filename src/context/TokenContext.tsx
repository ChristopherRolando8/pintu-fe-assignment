import React, { createContext, useContext, useState, useEffect } from 'react';
import { Token } from '@/types/token';
import { fetchTokenLogos, fetchTokens } from '@/services/tokenServices';

interface TokenContextProps {
  tokens: Token[];
  isLoading: boolean;
  error: string | null;
}

const TokenContext = createContext<TokenContextProps | undefined>(undefined);

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTokens = async () => {
      try {
        const [logosData, tokensData] = await Promise.all([fetchTokenLogos(), fetchTokens()]);
        const tokensWithLogos = logosData.slice(1).map(logo => {
          const tokenPriceData = tokensData.find(
            token => token.id.split('/')[0].toLowerCase() === logo.currencySymbol.toLowerCase()
          );
          return {
            id: logo.currencySymbol,
            name: logo.name,
            price: tokenPriceData ? tokenPriceData.price : '0',
            change24h: tokenPriceData ? tokenPriceData.change24h : '0',
            changeWeek: tokenPriceData ? tokenPriceData.changeWeek : '0',
            changeMonth: tokenPriceData ? tokenPriceData.changeMonth : '0',
            changeYear: tokenPriceData ? tokenPriceData.changeYear : '0',
            logoUrl: logo.logo,
          };
        });
        setTokens(tokensWithLogos);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to fetch token data. Please try again later.');
      }
    };

    const initialFetch = async () => {
      setIsLoading(true);
      await getTokens();
      setIsLoading(false);
    };

    initialFetch();

    const intervalId = setInterval(() => {
      getTokens();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <TokenContext.Provider value={{ tokens, isLoading, error }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useTokenContext must be used within a TokenProvider');
  }
  return context;
};
