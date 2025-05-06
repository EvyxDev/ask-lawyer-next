import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    domains: ['asklawyer.evyx.lol'], 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'asklawyer.evyx.lol', 
        port: '',
        pathname: '/**', 
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);