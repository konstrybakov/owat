/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['pino', 'pino-pretty', '@axiomhq/pino']
  }
};

export default nextConfig;
