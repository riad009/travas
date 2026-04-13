/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  ...(isDev && {
    async rewrites() {
      return {
        // beforeFiles runs BEFORE local file system — overrides the local page.tsx at /
        beforeFiles: [
          {
            source: '/',
            destination: 'http://localhost:3002/dev',
          },
        ],
        // afterFiles runs AFTER local file system — /brands still served locally
        afterFiles: [
          // /dev and sub-pages → Aqurion Development
          {
            source: '/dev',
            destination: 'http://localhost:3002/dev',
          },
          {
            source: '/dev/:path*',
            destination: 'http://localhost:3002/dev/:path*',
          },
          // /aqurion-holdings → Aqurion Holdings (web app)
          {
            source: '/aqurion-holdings',
            destination: 'http://localhost:3003/aqurion-holdings',
          },
          {
            source: '/aqurion-holdings/:path*',
            destination: 'http://localhost:3003/aqurion-holdings/:path*',
          },
          // /docs → Docs app
          {
            source: '/docs',
            destination: 'http://localhost:3001/docs',
          },
          {
            source: '/docs/:path*',
            destination: 'http://localhost:3001/docs/:path*',
          },
        ],
      };
    },
  }),
};
export default nextConfig;
