/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';
const nextConfig = {
  ...(isDev && {
    basePath: '/ai',
    assetPrefix: '/ai',
  }),
};
export default nextConfig;
