/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';
const nextConfig = {
  ...(isDev && {
    basePath: '/ps',
    assetPrefix: '/ps',
  }),
};
export default nextConfig;
