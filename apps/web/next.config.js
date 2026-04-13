/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';
const nextConfig = {
  ...(isDev && {
    basePath: '/aqurion-holdings',
    assetPrefix: '/aqurion-holdings',
  }),
};

export default nextConfig;
