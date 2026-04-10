/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';
const nextConfig = { ...(isDev && { basePath: '/sa', assetPrefix: '/sa' }) };
export default nextConfig;
