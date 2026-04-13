/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';
const nextConfig = {
  ...(isDev && {
    basePath: '/atm',
    assetPrefix: '/atm',
  }),
};
export default nextConfig;
