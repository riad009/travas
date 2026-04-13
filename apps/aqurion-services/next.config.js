/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';
const nextConfig = {
  ...(isDev && {
    basePath: '/services',
    assetPrefix: '/services',
  }),
};
export default nextConfig;
