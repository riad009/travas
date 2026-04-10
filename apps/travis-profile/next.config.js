/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';
const nextConfig = { ...(isDev && { basePath: '/travis', assetPrefix: '/travis' }) };
export default nextConfig;
