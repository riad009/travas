/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';
const nextConfig = {
  ...(isDev && {
    basePath: '/home',
    assetPrefix: '/home',
  }),
};
export default nextConfig;
