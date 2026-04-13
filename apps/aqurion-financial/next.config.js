/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';
const nextConfig = {
  ...(isDev && {
    basePath: '/financial',
    assetPrefix: '/financial',
  }),
};
export default nextConfig;
