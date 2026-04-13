/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';
const nextConfig = {
  ...(isDev && {
    basePath: '/hospitality',
    assetPrefix: '/hospitality',
  }),
};
export default nextConfig;
