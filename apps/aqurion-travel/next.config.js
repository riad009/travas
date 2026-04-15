/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';
const nextConfig = { ...(isDev && { basePath: '/travel', assetPrefix: '/travel' }) };
export default nextConfig;
