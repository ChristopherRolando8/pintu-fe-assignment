export interface Token {
  logo: string;
  currencySymbol: string;
  id: string;
  name: string;
  price: string;
  change24h: string;
  changeWeek: string;
  changeMonth: string;
  changeYear: string;
  logoUrl?: string | null;
}