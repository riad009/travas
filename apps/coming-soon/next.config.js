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
          // /ai → Aqurion AI
          {
            source: '/ai',
            destination: 'http://localhost:3004/ai',
          },
          {
            source: '/ai/:path*',
            destination: 'http://localhost:3004/ai/:path*',
          },
          // /marketing → Aqurion Marketing
          {
            source: '/marketing',
            destination: 'http://localhost:3005/marketing',
          },
          {
            source: '/marketing/:path*',
            destination: 'http://localhost:3005/marketing/:path*',
          },
          // /sales → Aqurion Sales
          {
            source: '/sales',
            destination: 'http://localhost:3006/sales',
          },
          {
            source: '/sales/:path*',
            destination: 'http://localhost:3006/sales/:path*',
          },
          // /sa → Aqurion South America
          {
            source: '/sa',
            destination: 'http://localhost:3007/sa',
          },
          {
            source: '/sa/:path*',
            destination: 'http://localhost:3007/sa/:path*',
          },
          // /travis → Travis Profile
          {
            source: '/travis',
            destination: 'http://localhost:3008/travis',
          },
          {
            source: '/travis/:path*',
            destination: 'http://localhost:3008/travis/:path*',
          },
        ],
      };
    },
  }),
};
export default nextConfig;
