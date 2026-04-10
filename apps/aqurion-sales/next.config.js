/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';
const nextConfig = { ...(isDev && { basePath: '/sales', assetPrefix: '/sales' }) };
export default nextConfig;
