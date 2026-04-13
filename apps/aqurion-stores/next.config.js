/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';
const nextConfig = {
  ...(isDev && {
    basePath: '/stores',
    assetPrefix: '/stores',
  }),
};
export default nextConfig;
