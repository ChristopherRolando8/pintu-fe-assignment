import axios from 'axios';
import { Token } from '@/types/token';

const API_URL_TOKENS = '/api/tokens';
const API_URL_LOGOS = '/api/supportedCurrencies';

export const fetchTokens = async (): Promise<Token[]> => {
  try {
    const response = await axios.get(API_URL_TOKENS);
    return response.data.payload.map((item: Record<string, unknown>) => ({
      id: item.pair,
      price: item.latestPrice,
      change24h: item.day,
      changeWeek: item.week,
      changeMonth: item.month,
      changeYear: item.year,
    }));
  } catch (error) {
    console.error('Error fetching tokens:', error);
    throw new Error('Network error while fetching tokens');
  }
};

export const fetchTokenLogos = async (): Promise<Token[]> => {
  try {
    const response = await axios.get(API_URL_LOGOS);
    return response.data.payload.map((item: Record<string, unknown>) => ({
      currencySymbol: item.currencySymbol,
      name: item.name,
      logo: item.logo,
    }));
  } catch (error) {
    console.error('Error fetching token logos:', error);
    throw new Error('Network error while fetching token logos');
  }
};
