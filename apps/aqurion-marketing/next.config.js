/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';
const nextConfig = {
  ...(isDev && { basePath: '/marketing', assetPrefix: '/marketing' }),
};
export default nextConfig;
