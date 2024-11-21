import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/tokens',
        destination: 'https://api.pintu.co.id/v2/trade/price-changes',
      },
      {
        source: '/api/supportedCurrencies',
        destination: 'https://api.pintu.co.id/v2/wallet/supportedCurrencies',
      },
    ];
  },
};

export default nextConfig;