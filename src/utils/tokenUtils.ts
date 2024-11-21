import { Token } from "@/types/token";

export const getTokenChangeValue = (token: Token, timeFrame: string) => {
    switch (timeFrame) {
      case '24H':
        return token.change24h || '0.00';
      case '1W':
        return token.changeWeek || '0.00';
      case '1M':
        return token.changeMonth || '0.00';
      case '1Y':
        return token.changeYear || '0.00';
      default:
        return '0.00';
    }
};