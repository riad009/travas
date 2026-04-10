/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';
const nextConfig = {
  ...(isDev && {
    basePath: '/dev',
    assetPrefix: '/dev',
  }),
};
export default nextConfig;
