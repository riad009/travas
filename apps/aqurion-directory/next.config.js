/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';
const nextConfig = {
  ...(isDev && {
    basePath: '/directory',
    assetPrefix: '/directory',
  }),
};
export default nextConfig;
